<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/Invoice.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$invoice = new Invoice($db);
 
// set ID property of product to be edited
$invoice->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$name = $invoice->readOne();
 
// create array
$invoice_arr = array(
    "id" => $invoice->id,
	"date" => $invoice->date,
	"cusNo" => $invoice->cusNo,
    "name" => $name,
    "total" => $invoice->total
);
 
// make it json format
print_r(json_encode($invoice_arr));
?>