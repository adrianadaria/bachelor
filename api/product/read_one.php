<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/Product.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$product = new Product($db);
 
// set ID property of product to be edited
$product->number = isset($_GET['number']) ? $_GET['number'] : die();
 
// read the details of product to be edited
$product->readOne();
 
// create array
$product_arr = array(
    "number" => $product->number,
    "name" => $product->name,
    "group" => $product->group,
    "price" => $product->price
);
 
// make it json format
print_r(json_encode($product_arr));
?>