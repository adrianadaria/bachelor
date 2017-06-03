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
 
$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare object
$customer = new Customer($db);
 
// get number of customer to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set property to be edited
$customer->number = $data->number;
 
// set property values
$customer->number = $data->number;
$customer->name = $data->name;
$customer->email = $data->email;
$customer->address = $data->address;
$customer->postcode = $data->postcode;
$customer->city = $data->city;
$customer->country = $data->country;
$customer->cvr = $data->cvr;

$update = $ec->updateDebtor($customer->number, $customer->name, $customer->email, $customer->address,
	$customer->postcode, $customer->city, $customer->country, $customer->cvr);

// update
if($update == 'success') {
    $customer->update();
	echo '{';
        echo '"message": "Customer was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update customer"';
    echo '}';
}
?>