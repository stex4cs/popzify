<?php
/**
 * og.php - Open Graph slika (1200x630)
 *
 * Usage: /og.php?title=Naslov&subtitle=Podnaslov&variant=video
 * Varijante menjaju boju odsjaja: purple (default), video, wedding, web, dark
 *
 * Sta se crta:
 *   tamna podloga + odsjaj u brend bojama, tekst levo, a desno tri
 *   vertikalna kadra iz stvarnih snimaka (assets/og/f1..f3.jpg).
 *
 * Font: Poppins iz assets/fonts/ (SIL OFL, ide uz repo). Ranije se
 * oslanjalo na sistemski font koji na hostingu ne postoji, pa je GD
 * padao na ugradjeni bitmap font - otud sicusan tekst bez kvacica.
 */

// JPEG, ne PNG: sadrzaj je fotografija plus prelaz, gde PNG pravi
// cetvrt megabajta, a JPEG istu sliku spakuje u desetak puta manje.
header('Content-Type: image/jpeg');
header('Cache-Control: public, max-age=604800'); // 7 dana

$title    = isset($_GET['title'])    ? (string) $_GET['title']    : 'Popzify';
$subtitle = isset($_GET['subtitle']) ? (string) $_GET['subtitle'] : '';
$variant  = isset($_GET['variant'])  ? (string) $_GET['variant']  : 'purple';

$W = 1200;
$H = 630;

if (!function_exists('imagecreatetruecolor')) {
    http_response_code(500);
    exit('GD nije dostupan');
}

$img = imagecreatetruecolor($W, $H);

/* ---------- 1. PODLOGA ----------
   Odsjaj se crta na sicusnom platnu pa se uvecava - imagecopyresampled
   ga usput izglaca u mek prelaz. Racuna se ~2000 piksela umesto 756.000.
--------------------------------- */
$glows = [
    'purple'  => [[108, 92, 231], [253, 121, 168]],
    'video'   => [[108, 92, 231], [253, 121, 168]],
    'wedding' => [[214, 158, 106], [253, 121, 168]],
    'web'     => [[ 76, 201, 176], [108,  92, 231]],
    'dark'    => [[ 60, 60,  90], [ 90,  70, 120]],
];
$g = isset($glows[$variant]) ? $glows[$variant] : $glows['purple'];

$sw = 150; $sh = 79;
$small = imagecreatetruecolor($sw, $sh);
for ($y = 0; $y < $sh; $y++) {
    for ($x = 0; $x < $sw; $x++) {
        $nx = $x / $sw; $ny = $y / $sh;
        // dva izvora svetla, jacina opada sa kvadratom rastojanja
        $d1 = sqrt(pow(($nx - 0.16) * 1.5, 2) + pow($ny - 0.28, 2));
        $d2 = sqrt(pow(($nx - 0.92) * 1.3, 2) + pow($ny - 0.10, 2));
        $i1 = max(0, 1 - $d1 * 1.55); $i1 = $i1 * $i1;
        $i2 = max(0, 1 - $d2 * 1.75); $i2 = $i2 * $i2;
        $r = (int) min(255, 11 + $g[0][0] * $i1 * 0.85 + $g[1][0] * $i2 * 0.55);
        $gg = (int) min(255, 11 + $g[0][1] * $i1 * 0.85 + $g[1][1] * $i2 * 0.55);
        $b = (int) min(255, 18 + $g[0][2] * $i1 * 0.85 + $g[1][2] * $i2 * 0.55);
        imagesetpixel($small, $x, $y, imagecolorallocate($small, $r, $gg, $b));
    }
}
imagecopyresampled($img, $small, 0, 0, 0, 0, $W, $H, $sw, $sh);
imagedestroy($small);

// Uvecavanje ostavlja blage kvadrate; jedan prolaz zamucenja ih brise.
// Mora pre crtanja plocica i teksta da njih ne dotakne.
if (function_exists('imagefilter')) {
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR);
}

/* ---------- 2. KADROVI DESNO ----------
   Tri vertikalna kadra 9:16, srednji podignut. Ako fajl fali,
   preskace se i tekst dobija vise mesta - slika se ne lomi.
------------------------------------- */
// set=svadbe daje kadrove sa vencanja; podrazumevano ide mesani set
// (borilacka vece, svadba, sajam) koji koriste /reels i /marketing.
$sets = [
    'default' => ['f1', 'f2', 'f3'],
    'svadbe'  => ['w1', 'w2', 'w3'],
];
$setKey = isset($_GET['set']) && isset($sets[$_GET['set']]) ? $_GET['set'] : 'default';
$tiles = array_map(function ($n) {
    return __DIR__ . '/assets/og/' . $n . '.jpg';
}, $sets[$setKey]);
$tW     = 170;
$tH     = 302;
$gap    = 14;
$startX = 645;
$offsets = [172, 128, 172]; // srednji visi

$border = imagecolorallocatealpha($img, 255, 255, 255, 100);
$drawn  = 0;
foreach ($tiles as $i => $path) {
    if (!is_file($path)) continue;
    $src = @imagecreatefromjpeg($path);
    if (!$src) continue;

    $x = $startX + $i * ($tW + $gap);
    $y = $offsets[$i];

    // senka ispod plocice
    $shadow = imagecolorallocatealpha($img, 0, 0, 0, 95);
    imagefilledrectangle($img, $x + 5, $y + 7, $x + $tW + 5, $y + $tH + 7, $shadow);

    imagecopyresampled($img, $src, $x, $y, 0, 0, $tW, $tH, imagesx($src), imagesy($src));
    imagerectangle($img, $x, $y, $x + $tW, $y + $tH, $border);
    imagedestroy($src);
    $drawn++;
}

/* ---------- 3. FONT ---------- */
$fontBold = __DIR__ . '/assets/fonts/Poppins-Bold.ttf';
$fontSemi = __DIR__ . '/assets/fonts/Poppins-SemiBold.ttf';
$fontReg  = __DIR__ . '/assets/fonts/Poppins-Regular.ttf';
foreach ([[$fontBold, 'C:/Windows/Fonts/arialbd.ttf'], [$fontReg, 'C:/Windows/Fonts/arial.ttf']] as $pair) {
    if (!is_file($pair[0]) && is_file($pair[1])) { /* ostavljeno kao krajnji fallback */ }
}
if (!is_file($fontSemi)) $fontSemi = $fontBold;
$useTTF = is_file($fontBold) && is_file($fontReg) && function_exists('imagettftext');

$white = imagecolorallocate($img, 255, 255, 255);
$soft  = imagecolorallocate($img, 176, 172, 208);
$pink  = imagecolorallocate($img, 253, 121, 168);

/** Lomi tekst u redove sirine najvise $maxWidth. */
function wrapText($text, $font, $size, $maxWidth) {
    $words = preg_split('/\s+/', trim($text));
    $lines = [];
    $cur = '';
    foreach ($words as $word) {
        $test = $cur === '' ? $word : $cur . ' ' . $word;
        $bbox = imagettfbbox($size, 0, $font, $test);
        if (($bbox[2] - $bbox[0]) > $maxWidth && $cur !== '') {
            $lines[] = $cur;
            $cur = $word;
        } else {
            $cur = $test;
        }
    }
    if ($cur !== '') $lines[] = $cur;
    return $lines;
}

if ($useTTF) {
    $textMax = $drawn > 0 ? 500 : 1040;
    $x = 74;

    // nadnaslov
    imagettftext($img, 15, 0, $x, 148, $pink, $fontSemi, 'POPZIFY  ·  BEOGRAD');

    // naslov - smanjuje se dok ne stane u tri reda
    $size = 50;
    $lines = wrapText($title, $fontBold, $size, $textMax);
    while (count($lines) > 3 && $size > 32) {
        $size -= 4;
        $lines = wrapText($title, $fontBold, $size, $textMax);
    }
    $lh = (int) round($size * 1.28);
    $y = 212;
    foreach ($lines as $line) {
        imagettftext($img, $size, 0, $x, $y, $white, $fontBold, $line);
        $y += $lh;
    }

    // linija pa podnaslov
    if ($subtitle !== '') {
        $y += 6;
        imagefilledrectangle($img, $x, $y - 12, $x + 46, $y - 9, $pink);
        $y += 26;
        foreach (wrapText($subtitle, $fontReg, 21, $textMax) as $line) {
            imagettftext($img, 21, 0, $x, $y, $soft, $fontReg, $line);
            $y += 32;
        }
    }

    imagettftext($img, 19, 0, $x, $H - 58, $white, $fontSemi, 'popzify.com');

} else {
    // Krajnji fallback: bez TTF-a GD ume samo sitan bitmap font.
    $map = ['č'=>'c','ć'=>'c','ž'=>'z','š'=>'s','đ'=>'dj','Č'=>'C','Ć'=>'C','Ž'=>'Z','Š'=>'S','Đ'=>'Dj'];
    imagestring($img, 5, 74, 280, strtr($title, $map), $white);
    if ($subtitle !== '') imagestring($img, 5, 74, 320, strtr($subtitle, $map), $soft);
    imagestring($img, 5, 74, $H - 70, 'popzify.com', $white);
}

imagejpeg($img, null, 88);
imagedestroy($img);
