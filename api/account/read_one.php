<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/Account.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$account = new Account($db);
 
// set ID property of product to be edited
$account->number = isset($_GET['number']) ? $_GET['number'] : die();
 
// read the details of product to be edited
$account->readOne();
 
// create array
$account_arr = array(
    "number" => $account->number,
    "name" => $account->name,
    "type" => $account->type,
    "card" => $account->card,
	"vat" => $account->vat,
	"balance" => $account->balance
);
 
// make it json format
print_r(json_encode($account_arr));
?>