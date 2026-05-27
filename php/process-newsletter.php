<?php
// U produkciji greške se NE prikazuju korisniku (samo se loguju na server).
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Log za praćenje pristupa skripti
error_log("process-newsletter.php skripta pozvana: " . date('Y-m-d H:i:s'));

// Postavite apsolutne putanje za logovanje
$base_dir = dirname(__DIR__); // Direktorijum iznad trenutnog
$log_dir = $base_dir . '/data';
$log_file = $log_dir . '/newsletter_subscribers.txt';

// Proverite da li direktorijum postoji, ako ne, kreirajte ga
if (!is_dir($log_dir)) {
    if (!mkdir($log_dir, 0755, true)) {
        error_log("Greška: Ne mogu da kreiram direktorijum {$log_dir}");
        http_response_code(500);
        echo "error";
        exit;
    }
}

// Proverite dozvole za pisanje
if (!is_writable($log_dir)) {
    error_log("Greška: Direktorijum {$log_dir} nema dozvole za pisanje");
    chmod($log_dir, 0755); // Pokušaj da postaviš dozvole
}

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Get email from form
        $email = isset($_POST["newsletter_email"]) ? 
                 filter_var(trim($_POST["newsletter_email"]), FILTER_SANITIZE_EMAIL) : '';
        
        // Zapišite debug informacije
        error_log("Newsletter email: {$email}");
        
        // Validate email
        if (empty($email)) {
            error_log("Greška: Email nije prosleđen");
            http_response_code(400);
            echo "missing_email";
            exit;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            error_log("Greška: Nevalidan email: {$email}");
            http_response_code(400);
            echo "invalid_email";
            exit;
        }
        
        // Create log content
        $log_content = "=== New Newsletter Subscription (" . date('Y-m-d H:i:s') . ") ===\n";
        $log_content .= "Email: $email\n\n";
        
        // Save to log file
        if (file_put_contents($log_file, $log_content, FILE_APPEND) === false) {
            error_log("Greška: Nije moguće pisati u log fajl: {$log_file}");
            http_response_code(500);
            echo "error";
            exit;
        }
        
        // Successful response
        error_log("Uspeh: Newsletter prijava sačuvana u log");
        http_response_code(200);
        echo "success";
        
    } catch (Exception $e) {
        error_log("Exception: " . $e->getMessage());
        http_response_code(500);
        echo "error";
    }
} else {
    // Not a POST request
    error_log("Greška: Neispravan metod zahteva: " . $_SERVER["REQUEST_METHOD"]);
    http_response_code(403);
    echo "error";
}
?>