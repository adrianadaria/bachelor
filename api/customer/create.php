<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/Customer.php';
 
$database = new Database();
$db = $database->getConnection();

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
$customer = new Customer($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$customer->number = $data->number;
$customer->name = $data->name;
$customer->email = $data->email;
$customer->address = $data->address;
$customer->postcode = $data->postcode;
$customer->city = $data->city;
$customer->country = $data->country;
$customer->cvr = $data->cvr;
$customer->created = date('Y-m-d H:i:s');
 $dNo, $dName, $dEmail, $dAddress, $dPostCode, $dCity, $dCountry, $dCvr
$insert = $ec->addDebtor($customer->number, $customer->name, $customer->email, $customer->address,
	$customer->postcode, $customer->city, $customer->country, $customer->cvr);
// create the product	//$product->create() && 
//$ec->addProduct($product->number, $product->name, $product->group, $product->price)
if($insert){
	$customer->create();
    echo '{';
        echo '"message": "Customer was created."';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create customer."';
    echo '}';
}
?>