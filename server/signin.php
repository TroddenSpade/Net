<?php

include('db_connection.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";

$res = $conn->query($sql);

    if (empty($res) || $res->num_rows == 0) {
        http_response_code(404);
        $data = array("message" => "User not found.");
        header("Content-Type: application/json");
        echo json_encode($data);
    } else {
        $time = time();
        $token = $username . $time;
        $token = md5($token);

        while($row = $res->fetch_assoc()) {
            $id = $row['id'];
            break;
        }
        $sql = "Insert into token (user, token) values ('$id', '$token')";
        $res = $conn->query($sql);
        if($res){
            http_response_code(200);
            $data = array("message" => "Success.", "token" => $token);
            echo json_encode($data);
        }else{
            http_response_code(400);
            $data = array("message" => "Error: " . $conn->error);
            echo json_encode($data);
        }
    }

?>