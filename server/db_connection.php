<?php      
    $host = "localhost";  
    $user = "root";  
    $password = '';  
    $db_name = "net_project";  
      
    $conn = mysqli_connect($host, $user, $password, $db_name);  
    if(mysqli_connect_errno()) {  
        die("Error: ". mysqli_connect_error());  
    }  
?>  