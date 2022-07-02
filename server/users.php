<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$token = $_POST['token'];

$sql = "SELECT user.id
        FROM user
        JOIN Token
        ON user.id = Token.user
        WHERE token = '$token'";

$res = $conn->query($sql);
if($res){
    $row = $res->fetch_assoc();

    $list = array();

    $sql = "SELECT id, name, username, pic FROM user WHERE id != '$row[id]'";

    $res = $conn->query($sql);
    
    if ($res) {
        while($row = $res->fetch_assoc()) {
            array_push($list, $row);
        }
        http_response_code(200);
        $data = array("message" => "Success.", "list" => $list);
        echo json_encode($data);
    } else {
        
        http_response_code(404);
        $data = array("message" => "Users not found.");
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}else{
    http_response_code(404);
    $data = array("message" => "Token invalid.");
    header("Content-Type: application/json");
    echo json_encode($data);
}

?>