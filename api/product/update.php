<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$configs = require_once('../config/config.php'); 
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/product.php';

$agreementGrantToken = $configs['agreementGrantToken'];
$appSecretToken = $configs['appSecretToken'];

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$product = new Product($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$product->number = $data->number;
 
// set product property values
$product->name = $data->name;
$product->group = $data->group;
$product->price = $data->price;

// update the product
if($ec->updateProduct($product->number, $product->name, $product->group, $product->price) == 'success') {
    $product->update();
	echo '{';
        echo '"message": "Product was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update product."';
    echo '}';
}
?>