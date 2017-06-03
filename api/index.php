<?php 

require_once('./config/Economic.php');
require_once('./config/database.php');
require_once('./objects/Product.php');
require_once('./objects/Customer.php');
require_once('./objects/Invoice.php');
require_once('./objects/Account.php');
require_once('./objects/ProductGroup.php');
require_once('./objects/CustomerGroup.php');
require_once('./objects/Order.php');
require_once('./objects/Detail.php');

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken);

$database = new Database();
$db = $database->getConnection();

if (isset($_GET['test'])) {
	echo 'testing area';
}

if (isset($_GET['products'])) {
	$productDataObjects = $ec->getAllproducts();
    importProducts($productDataObjects, $db);
}

if (isset($_GET['pg'])) {
	$productGroupDataObjects = $ec->getAllProductGroups();
    importProductGroups($productGroupDataObjects, $db);
}

if (isset($_GET['customers'])) {
	$customerDataArray = $ec->getAllDebtors();
    importCustomers($customerDataArray, $db);
}

if (isset($_GET['cg'])) {
	$customerGroupDataObjects = $ec->getAllDebtorGroups();
    importCustomerGroups($customerGroupDataObjects, $db);
}

if (isset($_GET['inv'])) {
	$invoiceDataObjects = $ec->getAllInvoices();
	importInvoices($invoiceDataObjects, $db);
   
}

if (isset($_GET['acc'])) {
	$accountDataArray = $ec->getAllAccounts();
	importAccounts($accountDataArray, $db);
}

if (isset($_GET['orders'])) {
	$orderDataArray = $ec->getAllOrders();
	importOrders($orderDataArray, $db);
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

function importProductGroups($data, $db) {
	$productGroup = new ProductGroup($db);
	
	foreach ($data as $i => $row) {
		$productGroup->number = $row->Number;
		$productGroup->name = $row->Name;
		(property_exists($row,'AccountForVatLiableDebtorInvoicesCurrentHandle') ? 
			$productGroup->vatAcc = $row->AccountForVatLiableDebtorInvoicesCurrentHandle->Number : $productGroup->vatAcc = 0);
		(property_exists($row,'AccountForVatExemptDebtorInvoicesCurrentHandle') ? 
			$productGroup->noVatAcc = $row->AccountForVatExemptDebtorInvoicesCurrentHandle->Number : $productGroup->noVatAcc = 0);
		$productGroup->created = date('Y-m-d H:i:s');

		if($productGroup->create()){
			echo '{';
				echo '"message": "Product group was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create product group."';
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

function importCustomerGroups($data, $db) {
	$customerGroup = new CustomerGroup($db);
	
	foreach ($data as $i => $row) {
		$customerGroup->number = $row->Number;
		$customerGroup->name = $row->Name;
		$customerGroup->account = $row->AccountHandle->Number;
		$customerGroup->created = date('Y-m-d H:i:s');

		if($customerGroup->create()){
			echo '{';
				echo '"message": "Customer group was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create customer group."';
			echo '}';
		}
	}
}

function importInvoices($data, $db) {
	$invoice = new Invoice($db);
	
	foreach ($data as $i => $row) {
		$invoice->id = $row->Id;
		$val = new DateTime($row->Date);
		$invoice->date = $val->format('Y-m-d');
		$invoice->cusNo = $row->DebtorHandle->Number;
		$invoice->total = $row->NetAmount;
		$invoice->created = date('Y-m-d H:i:s');

		if($invoice->create()){
			echo '{';
				echo '"message": "Invoice was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create invoice."';
			echo '}';
		}
	} 				
}

function importAccounts($data, $db) {
	$account = new Account($db);
	
	foreach ($data as $i => $row) {
		$account->number = $row->Number;
		$account->name = $row->Name;
		$account->type = $row->Type;
		$account->card = $row->DebitCredit;
		//if (property_exists($row,'VatAccountHandle')) { $account->vat = $row->VatAccountHandle->VatCode; }
		(property_exists($row,'VatAccountHandle') ? $account->vat = $row->VatAccountHandle->VatCode : $account->vat = '');
		$account->balance = $row->Balance;
		$account->created = date('Y-m-d H:i:s');

		if($account->create()){
			echo '{';
				echo '"message": "Account was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create account."';
			echo '}';
		}
	} 				
}

function importOrders($data, $db) {
	$order = new Order($db);
	//print_r($data);
	foreach ($data as $i => $row) {
		
		$order->id = $row->Id;
		$order->cusNo = $row->DebtorHandle->Number;
		$order->date = $row->Date;//$date->format('Y-m-d'); 
		(property_exists($row,'DeliveryAddress') ? $order->delAddress = $row->DeliveryAddress : $order->delAddress = '');
		(property_exists($row,'DeliveryPostalCode') ? $order->delZip = $row->DeliveryPostalCode : $order->delZip = '');
		(property_exists($row,'DeliveryCity') ? $order->delCity = $row->DeliveryCity : $order->delCity = '');
		(property_exists($row,'DeliveryCountry') ? $order->delCountry = $row->DeliveryCountry : $order->delCountry = '');
		(property_exists($row,'TermsOfDelivery') ? $order->delTerms = $row->TermsOfDelivery : $order->DelTerms = '');
		(property_exists($row,'DeliveryDate') ? $order->delDate = $row->DeliveryDate : $order->delDate = '');
		$order->total = $row->NetAmount;
		$order->created = date('Y-m-d H:i:s');
			
		if($order->create()) {
			echo '{';
				echo '"message": "Order was created."';
			echo '}';
		} else {
			echo '{';
				echo '"message": "Unable to create order."';
			echo '}';
		}
	
	}
}
//echo '<pre>';
//print_r($ec->getAllProductGroups());
//echo '</pre>';
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
				<li>ProductGroups <a href='index.php?pg=true'>import</a></li>
				<li>Customers <a href='index.php?customers=true'>import</a></li>
				<li>CustomerGroups <a href='index.php?cg=true'>import</a></li>
				<li>Invoices <a href='index.php?inv=true'>import</a></li>
				<li>Accounts <a href='index.php?acc=true'>import</a></li>
				<li>Orders <a href='index.php?orders=true'>import</a></li>
				<li>test <a href='index.php?test=true'>start</a></li>
			</ul>
		</section>
	</body>
</html>