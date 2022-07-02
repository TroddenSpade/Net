<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$username = $_POST['username'];
$number = $_POST['number'];
$password = $_POST['password'];
$name = $_POST['name'];

$res = $conn->query("INSERT INTO User (username, number, password, name) VALUES ('$username', '$number', '$password', '$name')");

    if ($res === TRUE) {
        http_response_code(200);
        $data = array("message" => "Successfully Done.");
        header("Content-Type: application/json");
        echo json_encode($data);
    } else {
        http_response_code(400);
        $data = array("message" => "Error: " . $conn->error);
        echo json_encode($data);
    }

?>