<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/Invoice.php';
 
$database = new Database();
$db = $database->getConnection();

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
$invoice = new Invoice($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$date = new DateTime($data->date);
$invoice->id = $data->id;
$invoice->date = $date->format('Y-m-d H:i:s');
$invoice->cusNo = $data->cusNo;
$invoice->total = $data->card;
$invoice->created = date('Y-m-d H:i:s');
 
$insert = 1;//$ec->addAccount($account->number, $account->name, $account->type, $account->card);

if($insert){
	//$invoice->create();
    echo '{';
        echo '"message": "Invoice was created."';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create account."';
    echo '}';
}
?>