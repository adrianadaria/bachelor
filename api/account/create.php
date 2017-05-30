<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/Account.php';
 
$database = new Database();
$db = $database->getConnection();

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
$account = new Account($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$account->number = $data->number;
$account->name = $data->name;
$account->type = $data->type;
$account->card = $data->card;
$account->vat = $data->vat;
$account->balance = $data->balance;
$account->created = date('Y-m-d H:i:s');
 
$insert = $ec->addAccount($account->number, $account->name, $account->type, $account->card);
// create the product	//$product->create() && 
//$ec->addProduct($product->number, $product->name, $product->group, $product->price)
if($insert){
	$account->create();
    echo '{';
        echo '"message": "Account was created."';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create account."';
    echo '}';
}
?>