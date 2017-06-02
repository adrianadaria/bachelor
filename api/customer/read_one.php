<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/Customer.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare object
$customer = new Customer($db);
 
// set number property of customer to be edited
$customer->number = isset($_GET['number']) ? $_GET['number'] : die();
 
// read the details of customer to be edited
$customer->readOne();
 
// create array
$customer_arr = array(
    "number" => $customer->number,
    "name" => $customer->name,
    "email" => $customer->email,
    "address" => $customer->address,
	"postcode" => $customer->postcode,
    "city" => $customer->city,
    "country" => $customer->country,
    "cvr" => $customer->cvr
);
 
// make it json format
print_r(json_encode($customer_arr));
?>