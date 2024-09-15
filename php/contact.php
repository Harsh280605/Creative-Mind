<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "creative_mind";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form submission handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    if(isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["email"])) {
        $first_name = $_POST["first_name"];
        $last_name = $_POST["last_name"];
        $email = $_POST["email"];
        $message = $_POST["message"];
        $additional = isset($_POST["additional"]) ? $_POST["additional"] : '';

        // Insert form data into the contact table
        $sql = "INSERT INTO contact (first_name, last_name, email, message, additional_details) VALUES ('$first_name', '$last_name', '$email', '$message', '$additional')";
        if ($conn->query($sql) === TRUE) {
            echo "Thank you for contacting us!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Form data missing.";
    }
}

$conn->close();
?>
