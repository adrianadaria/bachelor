<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/CustomerGroup.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$cgroup = new CustomerGroup($db);
 
// set ID property of product to be edited
$cgroup->number = isset($_GET['number']) ? $_GET['number'] : die();
 
// read the details of product to be edited
$cgroup->readOne();
 
// create array
$cgroup_arr = array(
    "number" => $cgroup->number,
    "name" => $cgroup->name,
    "account" => $cgroup->account
);
 
// make it json format
print_r(json_encode($cgroup_arr));
?>