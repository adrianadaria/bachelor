<?php 

require_once('./config/Economic.php');
require_once('./config/database.php');
require_once('./objects/Product.php');
require_once('./objects/Customer.php');

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken);

$database = new Database();
$db = $database->getConnection();

$productGroups = $ec->getAllProductGroups();
$go = $ec->aaa();

if (isset($_GET['products'])) {
	$productDataObjects = $ec->getAllproducts();
    importProducts($productDataObjects, $db);
}

if (isset($_GET['customers'])) {
	$customerDataArray = $ec->getAllDebtors();
    importCustomers($customerDataArray, $db);
}

if (isset($_GET['pu'])) {
	$number = 'Aconto';
	$name = 'Aconto indbetaling blah';
	$group = 1012; //5620
	$pno = $ec->updateProduct($number, $name, $group, 400.00);
    print($pno);
}

if (isset($_GET['dp'])) {
	/* $number = '98';
	if ($ec->deleteProduct($number)) {
		echo 'yay';
	} else {
		echo 'boo';
	} */
	print($ec->addProduct('98','atlas',1012,200.00));
}

function importProducts($data, $db) {
	$product = new Product($db);
	
	foreach ($data as $i => $row) {
		$product->number = $row->Number;
		$product->name = $row->Name;
		$product->price = $row->SalesPrice;
		$product->group = $row->ProductGroupHandle->Number;
		$product->created = date('Y-m-d H:i:s');

		if($product->create()){
			echo '{';
				echo '"message": "Product was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create product."';
			echo '}';
		}
	} 				
}

function importCustomers($data, $db) {
	$customer = new Customer($db);
	
	foreach ($data as $i => $row) {
		$customer->emptyProp();
		$customer->number = $row->Number;
		$customer->name = $row->Name;
		if (property_exists($row,'Email')) { $customer->email = $row->Email; }
		if (property_exists($row,'Address')) { $customer->address = $row->Address; }
		if (property_exists($row,'PostalCode')) { $customer->postcode = $row->PostalCode; }
		if (property_exists($row,'City')) { $customer->city = $row->City; }
		if (property_exists($row,'Country')) { $customer->country = $row->Country; }
		if (property_exists($row,'CINumber')) { $customer->cvr = $row->CINumber; }
		$customer->created = date('Y-m-d H:i:s'); 

		if($customer->create()){
			echo '{';
				echo '"message": "Customer was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create customer."';
			echo '}';
		} 
	} 				
}
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		
		<title>bikedesk e-conomic SOAP API</title>
		<style type="text/css">
			body { font-family: Verdana; width:80%; margin: auto; }
		</style>	
	</head>
	<body>
		<section>
			<ul>
				<li>Products <a href='index.php?products=true'>import</a></li>
				<li>Customers <a href='index.php?customers=true'>import</a></li>
				<li>Update product <a href='index.php?pu=true'>go</a></li>
				<li>Delete product <a href='index.php?dp=true'>goo</a></li>
			</ul>
		</section>
	</body>
</html>