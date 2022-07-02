<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$token = $_POST['token'];

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

$owner = $row['id'];

// $datetime = date('Y-m-d H:i:s') ;
$sql = "SELECT id FROM
        (SELECT receiver as id, date 
        FROM message 
        WHERE sender = '$owner' 
        GROUP BY id
        -- ORDER BY date DESC
        UNION 
        SELECT sender as id, date from message WHERE receiver = '$owner' GROUP BY id
        ORDER BY date DESC) as D
        GROUP BY id
        ORDER BY date DESC";

$res = $conn->query($sql);

// while($row = $res->fetch_assoc()){
//     print_r($row);
// }

if($res){
    $data = array();
    while($row = $res->fetch_assoc()){
        $chat = array();
        $id = $row['id'];
        $sql = "SELECT id, pic, name, username
                FROM user
                WHERE id = '$id'";
        $user = $conn->query($sql);
        if($user){
            $user = $user->fetch_assoc();
            array_push($chat, $user);
        } else {
            http_response_code(404);
            $data = array("message" => "Room not found.");
            header("Content-Type: application/json");
            echo json_encode($data);
            return;
        }
        $sql = "SELECT body, date, sender, is_read
                FROM message
                WHERE (message.sender = '$id' AND message.receiver = '$owner')
                OR (message.sender = '$owner' AND message.receiver = '$id')
                Order by message.date DESC";
        $msg = $conn->query($sql);
        if($msg){
            $msg = $msg->fetch_assoc();
            array_push($chat, $msg);
        } else {
            http_response_code(404);
            $data = array("message" => "Room not found.");
            header("Content-Type: application/json");
            echo json_encode($data);
            return;
        }
        array_push($data, $chat);
    }
    http_response_code(200);
    $data = array("message" => "Success.", "data" => $data);
    header("Content-Type: application/json");
    echo json_encode($data);
} else {
    http_response_code(400);
    $data = array("message" => $conn->error);
    header("Content-Type: application/json");
    echo json_encode($data);
}

?>