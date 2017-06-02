<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/Detail.php';
include_once '../config/Economic.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$detail = new Detail($db);
 
// query products
$data = $detail->read();
 
if ($data !== null) {
 
    echo json_encode($data);
} else {
    echo json_encode(array("message" => "No products found."));
}
?>