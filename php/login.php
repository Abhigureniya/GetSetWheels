<?php

$data = array("userName"=>"abhijeet","password"=>"password","access_token"=>"jgjgjgjgjg6867hbjhb7");

header('Content-Type: application/json');
header( 'HTTP/1.1 400 BAD REQUEST' );
echo json_encode($data);

?>