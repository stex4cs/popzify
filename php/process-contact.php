<?php
// U produkciji greške se NE prikazuju korisniku (samo se loguju na server).
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Log za praćenje pristupa skripti
error_log("process-contact.php script accessed: " . date('Y-m-d H:i:s')); // Promenjeno na engleski

// Postavite apsolutne putanje za logovanje
// dirname(__DIR__) daje direktorijum IZNAD direktorijuma gde je ova skripta
// Ako je ova skripta u public_html, $base_dir će biti folder IZNAD public_html
// Ako želiš da 'data' folder bude unutar public_html, koristi dirname(__FILE__) ili __DIR__
// 'data' folder se nalazi u root-u sajta (isti folder koristi i newsletter skripta).
$base_dir = dirname(__DIR__); // Direktorijum IZNAD php/ foldera
$log_dir = $base_dir . '/data';
$log_file = $log_dir . '/contact_log.txt';

// Proverite da li direktorijum postoji, ako ne, kreirajte ga
if (!is_dir($log_dir)) {
    // Pokušaj kreiranja sa dozvolama 0755 (ili probaj 0775 ako 0755 ne radi na tvom hostingu)
    if (!mkdir($log_dir, 0755, true)) { 
        error_log("Error: Cannot create log directory {$log_dir}");
        http_response_code(500);
        // Vrati JSON ili jednostavnu poruku o grešci za AJAX
        echo json_encode(['status' => 'error', 'message' => 'Server error creating log directory.']);
        exit;
    }
}

// Proverite dozvole za pisanje u direktorijum
if (!is_writable($log_dir)) {
    error_log("Warning: Log directory {$log_dir} might not be writable.");
    // Možeš pokušati chmod, ali to često ne radi na deljenom hostingu ako PHP nema vlasništvo
    // @chmod($log_dir, 0755); // @ suzbija grešku ako chmod ne uspe
}

// Proverite da li je forma poslata POST metodom
if($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Honeypot zaštita: ako je skriveno polje 'website' popunjeno, poruku je poslao bot.
        if (!empty($_POST["website"])) {
            error_log("Spam blokiran: honeypot polje 'website' popunjeno.");
            http_response_code(200); // Vrati 'uspeh' da bot ne pokušava ponovo
            echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
            exit;
        }

        // Uzmite podatke iz forme i očistite ih
        $name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
        $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
        $subject = isset($_POST["subject"]) ? strip_tags(trim($_POST["subject"])) : '';
        $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : '';

        // Logovanje primljenih podataka (bez poruke radi privatnosti u glavnom logu)
        error_log("Form data received: Name: {$name}, Email: {$email}, Subject: {$subject}");

        // Osnovna validacija
        if (empty($name) || empty($email) || empty($subject) || empty($message)) {
            error_log("Validation Error: Missing required form fields.");
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            error_log("Validation Error: Invalid email format: {$email}");
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
            exit;
        }

        // === Upisivanje u Log Fajl ===
        $log_content = "=== New Contact Message (" . date('Y-m-d H:i:s') . ") ===\n";
        $log_content .= "Name: $name\n";
        $log_content .= "Email: $email\n";
        $log_content .= "Subject: $subject\n";
        $log_content .= "Message:\n$message\n\n";

        // Sačuvajte u log fajl - koristimo @ da suzbijemo grešku ako ne uspe, jer je slanje emaila primarno
        if (@file_put_contents($log_file, $log_content, FILE_APPEND | LOCK_EX) === false) {
             // LOCK_EX sprečava da više procesa piše istovremeno (dobra praksa)
            error_log("Error: Failed to write to log file: {$log_file}. Check permissions.");
            // Nećemo prekinuti izvršavanje ovde, email je važniji
        } else {
            error_log("Success: Contact message saved to log file.");
        }


        // === Slanje Emaila ===
        $recipient_email = "info@popzify.com"; // TVOJA EMAIL ADRESA
        $email_subject = "New Contact Form Submission: " . $subject; // Naslov emaila

        // Telo emaila
        $email_body = "You received a new message from your website contact form:\n\n";
        $email_body .= "--------------------------------------------------\n";
        $email_body .= "Name:    " . $name . "\n";
        $email_body .= "Email:   " . $email . "\n";
        $email_body .= "Subject: " . $subject . "\n";
        $email_body .= "--------------------------------------------------\n";
        $email_body .= "Message:\n" . $message . "\n";
        $email_body .= "--------------------------------------------------\n";
        $email_body .= "Sent at: " . date('Y-m-d H:i:s') . "\n";

        // Zaglavlja (Headers)
        $headers = "From: Popzify Website <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'popzify.com') . ">\r\n"; // Koristi generički 'noreply' sa tvog domena
        $headers .= "Reply-To: " . $name . " <" . $email . ">\r\n"; // Omogućava 'Reply' direktno pošiljaocu
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Pokušaj slanja emaila
        if (mail($recipient_email, $email_subject, $email_body, $headers)) {
            error_log("Email successfully sent to {$recipient_email}");
            http_response_code(200);
            // Vrati JSON odgovor za AJAX
            echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
        } else {
            error_log("Error: PHP mail() function failed to send email to {$recipient_email}. Check server mail configuration.");
            http_response_code(500);
             // Vrati JSON odgovor za AJAX
            echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
        }

    } catch (Exception $e) {
        // Hvatanje neočekivanih grešaka
        error_log("Exception occurred: " . $e->getMessage());
        http_response_code(500);
         // Vrati JSON odgovor za AJAX
        echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.']);
    }
} else {
    // Nije POST zahtev - odbij pristup
    error_log("Error: Invalid request method used: " . $_SERVER["REQUEST_METHOD"]);
    http_response_code(405); // Method Not Allowed
     // Vrati JSON odgovor za AJAX
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>