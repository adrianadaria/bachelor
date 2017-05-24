<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/Account.php';
include_once '../config/Economic.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account = new Account($db);
 
// query products
$stmt = $account->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0) {
 
    // products array
    $accounts_arr = array();
    $accounts_arr["records"] = array();
 
    // retrieve account table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // this will make $row['name'] to just $name only
        extract($row);
		
        $account_item = array(
            "number" => $number,
            "name" => $name,
            "type" => $type, //html_entity_decode($description),
            "card" => $card,
			"vat" => trim($vat),
			"balance" => $balance
        );
 
        array_push($accounts_arr["records"], $account_item);
    }
 
    echo json_encode($accounts_arr);
}
 
else{
    echo json_encode(
        array("message" => "No accounts found.")
    );
}
?>