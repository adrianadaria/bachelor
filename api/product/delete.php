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
 
// get product number
$data = json_decode(file_get_contents("php://input"));
 
// set product number to be deleted
$product->number = $data->number;
 
// delete the product
if($ec->deleteProduct($product->number) == 'success') {
	$product->delete();
    echo '{';
        echo '"message": "Product was deleted."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>