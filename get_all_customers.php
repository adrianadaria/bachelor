<?php 
require_once('Economic.php');

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";
$ec = new Economic($agreementGrantToken, $appSecretToken);
$results = $ec->getAllDebtors();
echo json_encode($results);
?>