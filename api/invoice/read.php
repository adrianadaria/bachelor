<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/Invoice.php';
include_once '../config/Economic.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$invoice = new Invoice($db);
 
// query products
$stmt = $invoice->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0) {
 
    // products array
    $invoices_arr = array();
    $invoices_arr["records"] = array();
 
    // retrieve product table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // this will make $row['name'] to just $name only
        extract($row);
		$date = new DateTime($date);
        $invoice_item = array(
            "id" => $id,
            "date" => $date->format('Y-m-d'),
            "cusNo" => $cusNo, //html_entity_decode($description),
            "total" => $total,
			"name" => $name,
			"address" => $address,
			"city" => $city,
			"zip" => $postcode,
			"country" => $country,
			"email" => $email
        );
 
        array_push($invoices_arr["records"], $invoice_item);
    }
 
    echo json_encode($invoices_arr);
}
 
else{
    echo json_encode(
        array("message" => "No invoices found.")
    );
}
?>