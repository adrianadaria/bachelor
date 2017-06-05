<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
$configs = require_once('../config/config.php'); 
include_once '../config/Database.php';
include_once '../objects/Detail.php';
include_once '../objects/Order.php';
include_once '../config/Economic.php';

//economic
$agreementGrantToken = $configs['agreementGrantToken'];
$appSecretToken = $configs['appSecretToken'];
$ec = new Economic($agreementGrantToken, $appSecretToken);   
 
// instantiate database and object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$detail = new Detail($db);
$order = new Order($db);

$data = json_decode(file_get_contents("php://input"));

$cdata = $detail->getData();
$ids = $detail->getIds();
$date = date('Y-m-d');

if ($data->number == 666 && $ec->makeOrders($cdata, $ids, $date) == 'success') {
	$query = "TRUNCATE order";
	// prepare query statement
	$stmt = $db->prepare($query);
	$stmt->execute();
	
	$orderDataArray = $ec->getAllOrders();
	
	foreach ($orderDataArray as $i => $row) {
		
		$order->id = $row->Id;
		$order->cusNo = $row->DebtorHandle->Number;
		$order->date = $row->Date;//$date->format('Y-m-d'); 
		(property_exists($row,'DeliveryAddress') ? $order->delAddress = $row->DeliveryAddress : $order->delAddress = '');
		(property_exists($row,'DeliveryPostalCode') ? $order->delZip = $row->DeliveryPostalCode : $order->delZip = '');
		(property_exists($row,'DeliveryCity') ? $order->delCity = $row->DeliveryCity : $order->delCity = '');
		(property_exists($row,'DeliveryCountry') ? $order->delCountry = $row->DeliveryCountry : $order->delCountry = '');
		(property_exists($row,'TermsOfDelivery') ? $order->delTerms = $row->TermsOfDelivery : $order->DelTerms = '');
		(property_exists($row,'DeliveryDate') ? $order->delDate = $row->DeliveryDate : $order->delDate = '');
		$order->total = $row->NetAmount;
		$order->created = date('Y-m-d H:i:s');
			
		$order->create();
	}
	
	echo json_encode(array("message" => "Success."));
} else {
    echo json_encode(array("message" => "No entries found."));
}

?>