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

$ip = $_SERVER['REMOTE_ADDR'] ?? '?';

// Jednostavna zastita od flood-a: isti IP ne sme cesce od 20 sekundi.
$throttle_file = $log_dir . '/.lead_throttle_' . md5($ip);
if (is_file($throttle_file) && (time() - filemtime($throttle_file)) < 20) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Upit je vec poslat. Sacekaj malo pre sledeceg.']);
    exit;
}
@touch($throttle_file);

// === Upis u log ===
$log  = "=== NOVI LEAD /marketing (" . date('Y-m-d H:i:s') . ") ===\n";
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
$recipient = 'info@popzify.com';
$subject   = 'NOVI LEAD (' . $usluga . ') - ' . $ime;

$body  = "Novi upit sa kampanjske stranice popzify.com/marketing\n";
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
