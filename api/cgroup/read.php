<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/Database.php';
include_once '../objects/CustomerGroup.php';
include_once '../config/Economic.php';
 
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$cgroup = new CustomerGroup($db);
 
// query
$stmt = $cgroup->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0) {
 
    // array
    $cgroups_arr = array();
    $cgroups_arr["records"] = array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // this will make $row['name'] to just $name only
        extract($row);
		
        $cgroup_item = array(
            "number" => $number,
            "name" => $name,
            "account" => $account
        );
 
        array_push($cgroups_arr["records"], $cgroup_item);
    }
 
    echo json_encode($cgroups_arr);
}
 
else{
    echo json_encode(
        array("message" => "No customer groups found.")
    );
}
?>