<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/Detail.php';
include_once '../config/Economic.php';
include_once '../objects/Invoice.php';
$configs = require_once('../config/config.php'); 

//economic 
$agreementGrantToken = $configs['agreementGrantToken'];
$appSecretToken = $configs['appSecretToken'];
$ec = new Economic($agreementGrantToken, $appSecretToken);   
// instantiate database and object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$detail = new Detail($db);
$invoice = new Invoice($db);

$data = json_decode(file_get_contents("php://input"));
$cdata = $detail->getData();
$ids = $detail->getIds();
$date = date('Y-m-d');

if ($data->number == 666 && $ec->makeInvoiceDraft($cdata, $ids, $date) == 'success') {
	$query = "TRUNCATE invoice";
	// prepare query statement
	$stmt = $db->prepare($query);
	$stmt->execute();
	
	$invoiceDataObjects = $ec->getAllInvoices();
	
	foreach ($invoiceDataObjects as $i => $row) {
		
		$invoice->id = $row->Id;
		$val = new DateTime($row->Date);
		$invoice->date = $val->format('Y-m-d');
		$invoice->cusNo = $row->DebtorHandle->Number;
		$invoice->total = $row->NetAmount;
		$invoice->created = date('Y-m-d H:i:s');
		
		$invoice->create();
	} 		
	echo json_encode(array("message" => "Success."));	
} else {
    echo json_encode(array("message" => "No entries found."));
} 

?>