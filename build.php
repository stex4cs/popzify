<?php
// build.php - Minifikuje styles.css -> styles.min.css i main.js -> main.min.js
// Pokreni: `php build.php` PRE git commit-a kad menjas main.js ili styles.css
//
// Zahteva: PHP (za CSS) i `npx terser` (za JS) - oba vec instalirana.

echo "=== Build: minifikacija ===\n";

// ---- CSS minifikacija (PHP regex, bezbedna - samo whitespace + komentari) ----
$css = file_get_contents('styles.css');
$origCss = strlen($css);
$css = preg_replace('@/\*[\s\S]*?\*/@', '', $css);              // ukloni /* komentare */
$css = preg_replace('/\s+/', ' ', $css);                         // collapse whitespace
$css = preg_replace('/\s*([{}:;,>+~])\s*/', '$1', $css);         // skini razmake oko zagrada/separatora
$css = preg_replace('/;}/', '}', $css);                          // ; pre } je suvisan
$css = preg_replace('/:0(px|em|rem|%)/', ':0', $css);            // 0px -> 0
$css = trim($css);
file_put_contents('styles.min.css', $css);
$newCss = strlen($css);
printf("styles.css:  %s -> %s bajtova (smanjeno za %.1f%%)\n",
    number_format($origCss), number_format($newCss),
    (1 - $newCss / $origCss) * 100);

// ---- JS minifikacija (terser preko npx, siguran toolchain) ----
$origJs = filesize('main.js');
$cmd = 'npx --yes terser main.js --compress --mangle -o main.min.js 2>&1';
exec($cmd, $out, $code);
if ($code !== 0) {
    echo "GRESKA terser: " . implode("\n", $out) . "\n";
    exit(1);
}
$newJs = filesize('main.min.js');
printf("main.js:     %s -> %s bajtova (smanjeno za %.1f%%)\n",
    number_format($origJs), number_format($newJs),
    (1 - $newJs / $origJs) * 100);

echo "\nGotovo. Sad bumpuj cache (?v=N) u HTML referencama i pushuj.\n";
