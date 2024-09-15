<?php
// Database connection
$servername = "localhost"; // Or your server name
$username = "root";
$password = ""; // Ensure there are no spaces here
$database = "creative_mind";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Perform SQL query to check if user exists (you should hash and salt passwords for security)
    $sql = "SELECT * FROM login WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User found, you can redirect or perform other actions
        echo "Login successful!";
        // Redirect to index1.html
        header("Location: index1.html");
        exit(); // Ensure script execution stops after redirection
    } else {
        echo "Invalid email or password.";
    }
}

// Handle signup form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["signup"])) {
    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Perform SQL query to insert new user data into the database
    $sql = "INSERT INTO login (fullname, email, password) VALUES ('$fullname', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully!";
        // Redirect to index1.html
        header("Location: index1.html");
        exit(); // Ensure script execution stops after redirection
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
