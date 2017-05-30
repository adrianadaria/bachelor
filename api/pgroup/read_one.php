<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/ProductGroup.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$pgroup = new ProductGroup($db);
 
// set ID property of product to be edited
$pgroup->number = isset($_GET['number']) ? $_GET['number'] : die();
 
// read the details of product to be edited
$pgroup->readOne();
 
// create array
$pgroup_arr = array(
    "number" => $pgroup->number,
    "name" => $pgroup->name,
    "vatAcc" => $pgroup->vatAcc,
    "noVatAcc" => $pgroup->noVatAcc
);
 
// make it json format
print_r(json_encode($pgroup_arr));
?>