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
 
$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$account = new Account($db);
 
$data = json_decode(file_get_contents("php://input"));
 
// set number property of account to be edited
$account->number = $data->number;
 
// set account property values
$account->name = $data->name;
$account->type = $data->type;
$account->card = $data->card;
$account->vat = $data->vat;
$account->balance = $data->balance;

// update the account
if($ec->updateAccount($account->number, $account->name, $account->type, $account->card)) {
    $account->update();
	echo '{';
        echo '"message": "Account was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update account."';
    echo '}';
}
?>