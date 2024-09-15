<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if email and password are submitted via POST
if(isset($_POST['email']) && isset($_POST['password'])) {
    // Retrieve submitted email and password
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Database connection (you've already done this part)
    $servername = "localhost";
    $username = "root";
    $db_password = ""; // Update with your MySQL password
    $database = "creative_mind";

    $conn = new mysqli($servername, $username, $db_password, $database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if email and password match a user in the database
    $sql = "SELECT * FROM login WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            // User found, fetch and display data
            $row = $result->fetch_assoc();
            $fullname = $row['fullname'];
            $email = $row['email'];

            // Display user profile information
            echo "<h1>User Profile</h1>";
            echo "<p><strong>Full Name:</strong> $fullname</p>";
            echo "<p><strong>Email:</strong> $email</p>";
            // Add more fields as needed (e.g., age, etc.)
        } else {
            // If no matching user found, display an error message
            echo "Invalid email or password.";
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    // If email and password are not submitted, redirect to login page
    header("Location: login.html");
    exit();
}
?>