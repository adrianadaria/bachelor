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
 
// prepare object
$pgroup = new ProductGroup($db);
 
// get number to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set number
$pgroup->number = $data->number;

// set property values
$pgroup->name = $data->name;
$pgroup->vatAcc = $data->vatAcc;
$pgroup->noVatAcc = $data->noVatAcc;

// update
if($ec->updateProductGroup($pgroup->number, $pgroup->name, $pgroup->vatAcc, $pgroup->noVatAcc)) {
    $pgroup->update();
	echo '{';
        echo '"message": "Product group was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update product group"';
    echo '}';
}
?>