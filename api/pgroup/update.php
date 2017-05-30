<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/ProductGroup.php';
 
$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$pgroup = new ProductGroup($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$pgroup->number = $data->number;

// set product property values
$pgroup->name = $data->name;
$pgroup->vatAcc = $data->vatAcc;
$pgroup->noVatAcc = $data->noVatAcc;

// update the product
if($ec->updateProductGroup($pgroup->number, $pgroup->name, $pgroup->vatAcc, $pgroup->noVatAcc)) {
    $pgroup->update();
	echo '{';
        echo '"message": "Product Group was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update product group"';
    echo '}';
}
?>