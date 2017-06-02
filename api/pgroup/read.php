<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/ProductGroup.php';
include_once '../config/Economic.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$pgroup = new ProductGroup($db);
 
// query
$stmt = $pgroup->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0) {
 
    // array
    $pgroups_arr = array();
    $pgroups_arr["records"] = array();
 
    // retrieve  table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // this will make $row['name'] to just $name only
        extract($row);
		
        $pgroup_item = array(
            "number" => $number,
            "name" => $name,
            "vatAcc" => $vatAcc,
            "noVatAcc" => $noVatAcc
        );
 
        array_push($pgroups_arr["records"], $pgroup_item);
    }
 
    echo json_encode($pgroups_arr);
}
 
else{
    echo json_encode(
        array("message" => "No product groups found.")
    );
}
?>