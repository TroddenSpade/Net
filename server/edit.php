<?php   
    include('db_connection.php');

    $uploaddir = 'pics/';
    $date = time();
    $rand=rand(10000,99999);
    $filename=$date.$rand;

    $token = $_POST['token'];

    if(array_key_exists('name', $_POST)){
        $name = $_POST['name'];
    }
    
    if(!empty($_FILES['image']['tmp_name'])){
        $uploadfile = $uploaddir . $filename . '-' .$_FILES['image']['name'];
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
            $pic = $filename . '-' .$_FILES['image']['name'];
    
        }
    }

    if(!empty($name) && !empty($pic)){
        $sql = "UPDATE user JOIN token ON user.id = Token.user SET name = '$name', pic = '$pic' WHERE token = '$token'";
    }else if(!empty($name)){
        $sql = "UPDATE user JOIN token ON user.id = Token.user SET name = '$name' WHERE token = '$token'";
    }else if(!empty($pic)){
        $sql = "UPDATE user JOIN token ON user.id = Token.user SET pic = '$pic' WHERE token = '$token'";
    }

    $res = $conn->query($sql);
    if($res){
        http_response_code(200);
        $data = array("message" => "Successfully Done.");
        header("Content-Type: application/json");
        echo json_encode($data);
    }else{
        http_response_code(400);
        $data = array("message" => "Error: " . $conn->error);
        echo json_encode($data);
    }
?>