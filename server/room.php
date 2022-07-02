<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$id = $_POST['id'];
$token = $_POST['token'];

$sql = "SELECT user.id FROM user JOIN Token ON user.id = Token.user WHERE token = '$token'";
$res = $conn->query($sql);
if(empty($res) || $res->num_rows == 0){
    http_response_code(404);
    $data = array("message" => "User not found.");
    header("Content-Type: application/json");
    echo json_encode($data);
    return ;
}
$row = $res->fetch_assoc();
$owner = $row['id'];

$sql = "SELECT user.id, user.pic, user.name, user.username
        FROM user
        WHERE user.id = '$id'";
$res = $conn->query($sql);
if(empty($res) || $res->num_rows == 0){
    http_response_code(404);
    $data = array("message" => "User not found.");
    header("Content-Type: application/json");
    echo json_encode($data);
    return ;
}
$user = $res->fetch_assoc();

$sql = "SELECT id, sender, body, date, is_read FROM message 
        WHERE 
        (sender = '$owner' AND receiver = '$id') OR
        (sender = '$id' AND receiver = '$owner')
        ORDER BY date ASC";
$res = $conn->query($sql);

$list = array();

if ($res) {
    $sql = "UPDATE message SET is_read = 1 WHERE (sender = '$id' AND receiver = '$owner')";
    $res2 = $conn->query($sql);
    while($row = $res->fetch_assoc()) {
        array_push($list, $row);
    }
    http_response_code(200);

    $data = array("message" => "Success.", "user" => $user, "list" => $list);
    echo json_encode($data);
} else {
    http_response_code(404);
    $data = array("message" => "Room not found.");
    header("Content-Type: application/json");
    echo json_encode($data);
}

?>