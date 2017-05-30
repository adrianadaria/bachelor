<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/Customer.php';
 
// instantiate database and customer object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$customer = new Customer($db);
 
// query products
$stmt = $customer->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0) {
 
    // products array
    $customers_arr = array();
    $customers_arr["records"] = array();
 
    // retrieve product table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // this will make $row['name'] to just $name only
        extract($row);
 
        $customer_item = array(
            "number" => $number,
            "name" => $name,
			"email" => $email,
            "address" => $address,
            "postcode" => $postcode, //html_entity_decode($description)
			"city" => $city,
			"country" => $country,
			"cvr" => $cvr
        );
 
        array_push($customers_arr["records"], $customer_item);
    }
 
    echo json_encode($customers_arr);
}
 
else{
    echo json_encode(
        array("message" => "No customers found.")
    );
}
?>