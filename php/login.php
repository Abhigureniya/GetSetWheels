<?php

$header = apache_request_headers();

$data = json_decode(file_get_contents('php://input'), true);

if(!isset($data['loggingInBy'])){
$response = array("user"=>array("userRole"=>"editor","id"=>$data['password'],"token"=>"hsajdkasAHSkhkj78937294kjhdfkjshdskhfkshkfhsdkhwu","name"=>$data['username']));
}else{
	$response = array("user"=>array("userRole"=>"editor","id"=>$data['id'],"token"=>"hsajdkasAHSkhkj78937294kjhdfkjshdskhfkshkfhsdkhwu","name"=>$data['name']));
}
header('Content-Type: application/json');
echo json_encode($response);
//echo $data;

?>