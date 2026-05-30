<?php
/**
 * og.php - Dinamicki Open Graph image generator (1200x630)
 * Usage: /og.php?title=Naslov&subtitle=Podnaslov&variant=purple
 *
 * Varianti: purple (default), video, wedding, web
 *
 * Trazi Poppins TTF u assets/fonts/, ako nema fallback na DejaVu (sistem),
 * ako ni to nema fallback na PHP built-in font.
 */

header('Content-Type: image/png');
header('Cache-Control: public, max-age=2592000'); // 30 dana — og:image se redak menja

$title    = isset($_GET['title'])    ? (string)$_GET['title']    : 'Popzify';
$subtitle = isset($_GET['subtitle']) ? (string)$_GET['subtitle'] : 'Modern Web & Mobile Solutions';
$variant  = isset($_GET['variant'])  ? (string)$_GET['variant']  : 'purple';

$w = 1200;
$h = 630;

if (!function_exists('imagecreatetruecolor')) {
    http_response_code(500);
    echo "GD library not available";
    exit;
}

$img = imagecreatetruecolor($w, $h);

// Gradient po varianti
$variants = [
    'purple'  => [[108,  92, 231], [236,  72, 153]], // Popzify brand: ljubicasta -> roze
    'video'   => [[59, 130, 246], [168,  85, 247]],  // plava -> ljubicasta
    'wedding' => [[244, 114, 182], [108,  92, 231]], // roze -> ljubicasta
    'web'     => [[16, 185, 129], [108,  92, 231]],  // zelena -> ljubicasta
    'dark'    => [[18,  18,  18], [40,  40,  60]],   // dark mode
];
$colors = isset($variants[$variant]) ? $variants[$variant] : $variants['purple'];
$c1 = $colors[0];
$c2 = $colors[1];

// Vertikalni gradient
for ($y = 0; $y < $h; $y++) {
    $r = (int)round($c1[0] + ($c2[0] - $c1[0]) * ($y / $h));
    $g = (int)round($c1[1] + ($c2[1] - $c1[1]) * ($y / $h));
    $b = (int)round($c1[2] + ($c2[2] - $c1[2]) * ($y / $h));
    $color = imagecolorallocate($img, $r, $g, $b);
    imageline($img, 0, $y, $w, $y, $color);
}

// Dekorativni krug u uglu za vizuelnu zanimljivost
$accent = imagecolorallocatealpha($img, 255, 255, 255, 110);
imagefilledellipse($img, $w + 60, $h - 60, 280, 280, $accent);
imagefilledellipse($img, -40, 80, 220, 220, $accent);

$white = imagecolorallocate($img, 255, 255, 255);
$soft  = imagecolorallocate($img, 235, 230, 255);

// Trazimo TTF font (Poppins prvo, DejaVu fallback)
$fontBold = '';
$fontRegular = '';
$boldCandidates = [
    __DIR__ . '/assets/fonts/Poppins-Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    'C:/Windows/Fonts/arialbd.ttf',
];
$regularCandidates = [
    __DIR__ . '/assets/fonts/Poppins-Regular.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans.ttf',
    'C:/Windows/Fonts/arial.ttf',
];
foreach ($boldCandidates as $p) { if (file_exists($p)) { $fontBold = $p; break; } }
foreach ($regularCandidates as $p) { if (file_exists($p)) { $fontRegular = $p; break; } }
$useTTF = $fontBold !== '' && function_exists('imagettftext');

// Pomocna: obmotaj tekst da stane u maksimalnu sirinu
function wrapText($text, $font, $size, $maxWidth) {
    $words = explode(' ', $text);
    $lines = [];
    $cur = '';
    foreach ($words as $w) {
        $test = $cur === '' ? $w : $cur . ' ' . $w;
        $bbox = imagettfbbox($size, 0, $font, $test);
        $width = $bbox[2] - $bbox[0];
        if ($width > $maxWidth && $cur !== '') {
            $lines[] = $cur;
            $cur = $w;
        } else {
            $cur = $test;
        }
    }
    if ($cur !== '') $lines[] = $cur;
    return $lines;
}

if ($useTTF) {
    // Title (big, bold) - automatski wrap ako je duzi
    $titleSize = 60;
    $titleLines = wrapText($title, $fontBold, $titleSize, 1040);
    if (count($titleLines) > 2) $titleSize = 50;
    $titleLines = wrapText($title, $fontBold, $titleSize, 1040);

    $startY = 230;
    foreach ($titleLines as $i => $line) {
        imagettftext($img, $titleSize, 0, 80, $startY + $i * ($titleSize + 14), $white, $fontBold, $line);
    }

    // Subtitle (smaller, regular)
    if ($subtitle !== '') {
        $subSize = 28;
        $subStartY = $startY + count($titleLines) * ($titleSize + 14) + 30;
        $subLines = wrapText($subtitle, $fontRegular, $subSize, 1040);
        foreach ($subLines as $i => $line) {
            imagettftext($img, $subSize, 0, 80, $subStartY + $i * ($subSize + 8), $soft, $fontRegular, $line);
        }
    }

    // Popzify brand bottom-right
    $brandSize = 32;
    $brandText = 'Popzify';
    $bbox = imagettfbbox($brandSize, 0, $fontBold, $brandText);
    $brandWidth = $bbox[2] - $bbox[0];
    imagettftext($img, $brandSize, 0, $w - $brandWidth - 60, $h - 50, $white, $fontBold, $brandText);

    // Mali ".com" pored
    $domSize = 20;
    $domText = '.com';
    imagettftext($img, $domSize, 0, $w - 55, $h - 52, $soft, $fontRegular, $domText);

} else {
    // Fallback: built-in font + ASCII transliteracija (za Srpske karaktere)
    $map = ['č'=>'c','ć'=>'c','ž'=>'z','š'=>'s','đ'=>'dj','Č'=>'C','Ć'=>'C','Ž'=>'Z','Š'=>'S','Đ'=>'Dj'];
    $title = strtr($title, $map);
    $subtitle = strtr($subtitle, $map);
    imagestring($img, 5, 80, 250, $title, $white);
    if ($subtitle !== '') imagestring($img, 5, 80, 310, $subtitle, $soft);
    imagestring($img, 5, $w - 220, $h - 80, 'Popzify', $white);
}

imagepng($img);
imagedestroy($img);
