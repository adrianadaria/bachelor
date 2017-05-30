<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/Order.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$order = new Order($db);
 
// set ID property of product to be edited
$order->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$name = $order->readOne();
 
// create array
$order_arr = array(
    "id" => $order->id,
    "cusNo" => $order->cusNo,
	"name" => $name,
    "date" => $order->date,
    "delAddress" => $order->delAddress,
	"delZip" => $order->delZip,
    "delCity" => $order->delCity,
    "delCountry" => $order->delCountry,
    "delTerms" => $order->delTerms,
    "delDate" => $order->delDate,
    "total" => $order->total
);
 
// make it json format
print_r(json_encode($order_arr));
?>