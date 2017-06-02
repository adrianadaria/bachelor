<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/Order.php';
include_once '../config/Economic.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$order = new Order($db);
 
// query
$stmt = $order->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0) {
 
    // array
    $orders_arr = array();
    $orders_arr["records"] = array();
 
    // retrieve table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // this will make $row['name'] to just $name only
        extract($row);
		if($delDate !== 'NULL') {
			$delDate = new DateTime($delDate);
			$fdelDate = $delDate->format('Y-m-d');
		} else {
			$fdelDate = $delDate;
		}
		$date = new DateTime($date);
        $order_item = array(
            "id" => $id,
            "cusNo" => $cusNo,
            "date" => $date->format('Y-m-d'),
			"delAddress" => $delAddress,
			"delZip" => $delZip,
			"delCity" => $delCity,
			"delCountry" => $delCountry,
			"delTerms" => $delTerms,
			"delDate" => $fdelDate,	
			"total" => $total,
			"cusName" => $name
        );
 
        array_push($orders_arr["records"], $order_item);
    }
 
    echo json_encode($orders_arr);
}
 
else{
    echo json_encode(
        array("message" => "No orders found.")
    );
}
?>