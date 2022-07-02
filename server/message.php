<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$token = $_POST['token'];
$room = $_POST['room'];
$message = $_POST['message'];

$sql = "SELECT user.id FROM user JOIN Token ON user.id = Token.user WHERE token = '$token'";
$res = $conn->query($sql);
if(empty($res) || $res->num_rows == 0){
    http_response_code(404);
    $data = array("message" => "Token invalid.");
    header("Content-Type: application/json");
    echo json_encode($data);
    return ;
}
$row = $res->fetch_assoc();

// $datetime = date('Y-m-d H:i:s') ;
$sql = "INSERT INTO message (sender, receiver, body) VALUES ('$row[id]', '$room', '$message')";

$res = $conn->query($sql);
if($res){
    http_response_code(200);
    $data = array("message" => "Success.");
    header("Content-Type: application/json");
    echo json_encode($data);
} else {
    http_response_code(400);
    $data = array("message" => $conn->error);
    header("Content-Type: application/json");
    echo json_encode($data);
}

?>