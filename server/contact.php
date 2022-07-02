<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$token = $_POST['token'];

$sql = "SELECT user.id, user.name, user.number, user.pic
        FROM user
        JOIN contact
        ON user.id = contact.target_user
        JOIN Token
        ON contact.user = Token.user
        WHERE token = '$token'";

$res = $conn->query($sql);

$list = array();

    if ($res) {
        while($row = $res->fetch_assoc()) {
            array_push($list, $row);
        }
        http_response_code(200);
        $data = array("message" => "Success.", "list" => $list);
        echo json_encode($data);
    } else {
        
        http_response_code(404);
        $data = array("message" => "User not found.");
        header("Content-Type: application/json");
        echo json_encode($data);
    }

?>