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
include_once '../objects/Invoice.php';

$agreementGrantToken = $configs['agreementGrantToken'];
$appSecretToken = $configs['appSecretToken'];

$ec = new Economic($agreementGrantToken, $appSecretToken);  
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare object
$invoice = new Invoice($db);
 
// get id
$data = json_decode(file_get_contents("php://input"));
 
// set id to be deleted
$invoice->id = $data->id;
 
// delete 
if($ec->deleteInvoiceDraft($invoice->id) == 'success') {
	$invoice->delete();
    echo '{';
        echo '"message": "Invoice was deleted."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to delete invoice"';
    echo '}';
}
?>