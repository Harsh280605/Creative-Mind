<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Directory where uploaded files will be stored
    $target_dir = __DIR__ . "/uploads/";

    // Create the uploads directory if it doesn't exist
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true); // Create the directory recursively
    }

    // Database connection
    $servername = "localhost"; // Change this to your database server name
    $username = "root"; // Change this to your database username
    $password = ""; // Change this to your database password
    $dbname = "creative_mind"; // Change this to your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind parameters
    $stmt = $conn->prepare("INSERT INTO materials (fullName, email, gender, course, bio, resume) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $fullName, $email, $gender, $course, $bio, $resume);

    // Set parameters
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $course = $_POST['course'];
    $bio = $_POST['bio'];
    $resume = basename($_FILES['resume']['name']); // Sanitize the file name

    // Move uploaded file to desired location
    $target_file = $target_dir . $resume;
    if (move_uploaded_file($_FILES["resume"]["tmp_name"], $target_file)) {
        // File uploaded successfully, execute SQL statement
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        // Error in file upload
        echo "Error uploading file.";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
