<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$token = $_POST['token'];
$number = $_POST['number'];

$sql = "SELECT user.id FROM user JOIN Token ON user.id = Token.user WHERE token = '$token'";
$res = $conn->query($sql);
if(empty($res) || $res->num_rows == 0){
    http_response_code(404);
    $data = array("message" => "Token invalid.");
    header("Content-Type: application/json");
    echo json_encode($data);
    return ;
}
$user = $res->fetch_assoc();

$sql = "SELECT user.id FROM user WHERE number = '$number'";
$res = $conn->query($sql);
if(empty($res) || $res->num_rows == 0){
    http_response_code(404);
    $data = array("message" => "User not found.");
    header("Content-Type: application/json");
    echo json_encode($data);
    return ;
}
$target = $res->fetch_assoc();

if($user['id'] == $target['id']){
    http_response_code(400);
    $data = array("message" => "You can't add yourself.");
    header("Content-Type: application/json");
    echo json_encode($data);
    return ;
}

$sql = "INSERT INTO contact (target_user, user) VALUES ('$target[id]', '$user[id]')";
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