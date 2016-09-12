<?php

$data = json_decode(file_get_contents('php://input'), true);

//$data = array("userName"=>$username,"password"=>$password,"access_token"=>"jgjgjgjgjg6867hbjhb7");

header('Content-Type: application/json');
echo json_encode($data);

?>