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
    $fname = $_POST["fname"];
    $email = $_POST["email"];
    $additional = $_POST["additional"];
    
    // Insert form data into the feedback table
    $sql = "INSERT INTO feedback (name, email, additional) VALUES ('$fname', '$email', '$additional')";
    if ($conn->query($sql) === TRUE) {
        echo "Thank you for your feedback!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
