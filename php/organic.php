<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "creative_mind";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$course = $_POST['course'];
$completion_date = $_POST['completion-date'];

// Insert data into database
$sql = "INSERT INTO inorganic (fullname, email, course, completion_date)
        VALUES ('$fullname', '$email', '$course', '$completion_date')";

if ($conn->query($sql) === TRUE) {
    echo "Certification claim submitted successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
