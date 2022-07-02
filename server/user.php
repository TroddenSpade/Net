<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$token = $_POST['token'];

$sql = "SELECT * FROM user JOIN Token ON user.id = Token.user WHERE token = '$token'";

$res = $conn->query($sql);


    if (empty($res) || $res->num_rows == 0) {
        http_response_code(404);
        $data = array("message" => "User not found.");
        header("Content-Type: application/json");
        echo json_encode($data);
    } else {

        while($row = $res->fetch_assoc()) {
            $pic = "http://localhost/project/pics/" . $row['pic'];
            $name = $row['name'];
            $username = $row['username'];
            $number = $row['number'];
            break;
        }
        
        http_response_code(200);
        $data = array("message" => "Success.", "pic" => $pic, "name" => $name, "username" => $username, "number" => $number);
        echo json_encode($data);
    }

?>