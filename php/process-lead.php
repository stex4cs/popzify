<?php
/**
 * Prijem lead-ova sa kampanjske stranice /marketing.
 *
 * Radi isto sto i process-contact.php, ali sa poljima koja landing stranica
 * salje (telefon, usluga, link sajta, rezultat kviza, UTM izvor).
 * Odgovor je uvek JSON: {"status":"success|error","message":"..."}
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

$base_dir = dirname(__DIR__);
$log_dir  = $base_dir . '/data';
$log_file = $log_dir . '/leads_log.txt';

// Prima samo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Nedozvoljena metoda.']);
    exit;
}

/**
 * Cisti korisnicki unos i uklanja prelome reda
 * (sprecava ubacivanje dodatnih zaglavlja u e-mail).
 */
function clean($value, $max = 500) {
    $value = is_string($value) ? $value : '';
    $value = strip_tags(trim($value));
    $value = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value);
    return mb_substr($value, 0, $max);
}

/**
 * Pravi IP posetioca.
 *
 * Iza Cloudflare-a ili nekog drugog proxy-ja REMOTE_ADDR je adresa proxy-ja,
 * pa bi svi posetioci delili isti throttle i jedan upit bi blokirao ostale.
 * Zato prvo gledamo zaglavlja koja nose stvarni IP. Ta zaglavlja se mogu
 * lazirati, ali throttle je ovde samo meka zastita - botove hvata honeypot.
 */
function client_ip() {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP'] as $header) {
        if (!empty($_SERVER[$header]) && filter_var($_SERVER[$header], FILTER_VALIDATE_IP)) {
            return $_SERVER[$header];
        }
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $first = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
        if (filter_var($first, FILTER_VALIDATE_IP)) {
            return $first;
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/** Kao clean(), ali zadrzava prelome reda - za telo poruke. */
function clean_multiline($value, $max = 3000) {
    $value = is_string($value) ? $value : '';
    $value = strip_tags(trim($value));
    $value = str_replace("\r\n", "\n", $value);
    return mb_substr($value, 0, $max);
}

// Honeypot: polje 'website' je nevidljivo ljudima, popunjavaju ga botovi.
// Botu vracamo 'uspeh' da ne pokusava ponovo.
if (!empty($_POST['website'])) {
    error_log('Lead spam blokiran (honeypot) sa IP ' . ($_SERVER['REMOTE_ADDR'] ?? '?'));
    echo json_encode(['status' => 'success', 'message' => 'Upit primljen.']);
    exit;
}

$ime     = clean($_POST['ime']     ?? '', 120);
$telefon = clean($_POST['telefon'] ?? '', 40);
$email   = clean($_POST['email']   ?? '', 160);
$usluga  = clean($_POST['usluga']  ?? '', 120);
$sajt    = clean($_POST['sajt']    ?? '', 300);
$izvor   = clean($_POST['izvor']   ?? '', 400);
$kviz    = clean($_POST['kviz']    ?? '', 60);
$poruka  = clean_multiline($_POST['poruka'] ?? '');
$saglasnost = !empty($_POST['saglasnost']);

// Obavezna polja
if ($ime === '' || $telefon === '' || $usluga === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Popuni ime, telefon i izaberi uslugu.']);
    exit;
}

// Telefon: bar 8 cifara
if (strlen(preg_replace('/\D/', '', $telefon)) < 8) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Broj telefona nije ispravan.']);
    exit;
}

// E-mail je opcion, ali ako je unet mora da valja
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'E-mail adresa nije ispravna.']);
    exit;
}

if (!$saglasnost) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Potrebna je saglasnost za obradu podataka.']);
    exit;
}

// Direktorijum za logove
if (!is_dir($log_dir) && !mkdir($log_dir, 0755, true) && !is_dir($log_dir)) {
    error_log("Lead: ne mogu da kreiram {$log_dir}");
}

$ip  = client_ip();
$now = time();

/**
 * Zastita od flood-a.
 *
 * Namerno je popustljiva: honeypot iznad hvata botove, a lazno blokiran
 * posetilac koji je stigao sa placenog oglasa kosta vise nego par visak upita.
 * Dozvoljeno je $throttle_max upita u $throttle_window sekundi po IP-u.
 */
$throttle_window = 600; // 10 minuta
$throttle_max    = 5;

$throttle_file = $log_dir . '/.lead_throttle_' . md5($ip);
$hits = [];
if (is_file($throttle_file)) {
    foreach (explode(',', (string) @file_get_contents($throttle_file)) as $ts) {
        $ts = (int) $ts;
        if ($ts > 0 && ($now - $ts) < $throttle_window) {
            $hits[] = $ts;
        }
    }
}

if (count($hits) >= $throttle_max) {
    error_log("Lead throttle: {$ip} je poslao " . count($hits) . " upita u poslednjih {$throttle_window}s.");
    http_response_code(429);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Primili smo vise upita sa ove veze. Pozovi nas na 060 5973212 i resavamo odmah.',
    ]);
    exit;
}

$hits[] = $now;
@file_put_contents($throttle_file, implode(',', $hits), LOCK_EX);

// Povremeno pocisti stare throttle fajlove da data/ ne raste u nedogled.
if (mt_rand(1, 50) === 1) {
    foreach (glob($log_dir . '/.lead_throttle_*') ?: [] as $old) {
        if (($now - (int) @filemtime($old)) > $throttle_window * 2) {
            @unlink($old);
        }
    }
}

// === Upis u log ===
// Sa koje stranice je upit stigao (/marketing, /reels, ...). Referer moze
// da izostane, pa je ovo samo informativno, nikad uslov za obradu.
$stranica = '-';
if (!empty($_SERVER['HTTP_REFERER'])) {
    $path = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_PATH);
    if (is_string($path) && $path !== '') {
        $stranica = clean($path, 120);
    }
}

$log  = "=== NOVI LEAD {$stranica} (" . date('Y-m-d H:i:s') . ") ===\n";
$log .= "Ime:      {$ime}\n";
$log .= "Telefon:  {$telefon}\n";
$log .= "Email:    " . ($email !== '' ? $email : '-') . "\n";
$log .= "Usluga:   {$usluga}\n";
$log .= "Sajt:     " . ($sajt !== '' ? $sajt : '-') . "\n";
$log .= "Kviz:     " . ($kviz !== '' ? $kviz : '-') . "\n";
$log .= "Izvor:    " . ($izvor !== '' ? $izvor : '-') . "\n";
$log .= "IP:       {$ip}\n";
$log .= "Poruka:\n" . ($poruka !== '' ? $poruka : '-') . "\n\n";

if (@file_put_contents($log_file, $log, FILE_APPEND | LOCK_EX) === false) {
    error_log("Lead: neuspesan upis u {$log_file}");
}

// === Slanje e-maila ===
// Adresa na koju stizu lead-ovi sa kampanjskih stranica.
// Ako se menja, promeni je samo ovde - nigde drugde nije zakucana.
$recipient = 'business@popzify.com';
$subject   = 'NOVI LEAD (' . $usluga . ') - ' . $ime;

$body  = "Novi upit sa kampanjske stranice: {$stranica}\n";
$body .= "--------------------------------------------------\n";
$body .= "Ime:      {$ime}\n";
$body .= "Telefon:  {$telefon}\n";
$body .= "Email:    " . ($email !== '' ? $email : '-') . "\n";
$body .= "Usluga:   {$usluga}\n";
$body .= "Sajt:     " . ($sajt !== '' ? $sajt : '-') . "\n";
$body .= "Kviz:     " . ($kviz !== '' ? $kviz : '-') . "\n";
$body .= "Izvor:    " . ($izvor !== '' ? $izvor : '-') . "\n";
$body .= "--------------------------------------------------\n";
$body .= "Poruka:\n" . ($poruka !== '' ? $poruka : '(nije uneta)') . "\n";
$body .= "--------------------------------------------------\n";
$body .= "Vreme: " . date('Y-m-d H:i:s') . " | IP: {$ip}\n";

$server = $_SERVER['SERVER_NAME'] ?? 'popzify.com';
$headers  = "From: Popzify Landing <noreply@{$server}>\r\n";
if ($email !== '') {
    $headers .= "Reply-To: {$ime} <{$email}>\r\n";
}
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

$sent = @mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if (!$sent) {
    error_log("Lead: mail() nije uspeo za {$recipient}. Lead je sacuvan u leads_log.txt.");
}

// Lead je zabelezen u fajl i kad e-mail ne prodje, pa korisniku vracamo uspeh.
http_response_code(200);
echo json_encode(['status' => 'success', 'message' => 'Upit primljen.']);
