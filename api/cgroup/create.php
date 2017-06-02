<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/CustomerGroup.php';
 
$database = new Database();
$db = $database->getConnection();

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken); 
 
$cgroup = new CustomerGroup($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
$cgroup->number = $data->number;
$cgroup->name = $data->name;
$cgroup->account = $data->type;
$cgroup->created = date('Y-m-d H:i:s');
 

if($ec->addDebtorGroup($cgroup->number, $cgroup->name, $cgroup->account)) {
	$cgroup->create();
    echo '{';
        echo '"message": "Customer group was created."';
    echo '}';
}
 
// if unable to create, tell the user
else{
    echo '{';
        echo '"message": "Unable to create customer group."';
    echo '}';
}
?>