<?php

require_once('Economic.php');
header('Content-type: text/html; charset="utf-8"');

function SQL($dbname,$query) {
    $servername = "localhost";
    $username = "root";
    $password = "root";

    try {

		$conn = new PDO("mysql:host=$servername;charset=utf8;dbname=$dbname", $username, $password);
		$stmt = $conn->prepare($query);
		$stmt->execute();
		
        return $stmt->fetchAll();

    } catch (PDOException $e) {
        echo $data . "<br>" . $e->getMessage();
    }
}

$me = $_SERVER['PHP_SELF'];

$agreementGrantToken = "SI3xOLaIzbSWH1embrkNYSWWIKBK09bd8efEvZRvKwo1";
$appSecretToken = "7tVtBFEIEBPre0Fq3NWlNds54AXF76xA4NIe8vMsKx41";

$ec = new Economic($agreementGrantToken, $appSecretToken);

$customerDataArray = $ec->getAllDebtors();

if (isset($_POST['addCustomer'])) {
	$ec->addDebtor($_POST['cno'], $_POST['cname'], $_POST['cemail'], $_POST['caddress'], $_POST['cpost'], $_POST['ccity'], $_POST['ccountry'], $_POST['ccvr']);
	echo "<meta http-equiv='refresh' content='0'>";
}

$productDataObjects = $ec->getAllproducts();

if (isset($_POST['addProduct'])) {
	$ec->addProduct($_POST['pno'], $_POST['pname'], $_POST['pprice']);
	echo "<meta http-equiv='refresh' content='0'>";
}

function getCustomers($data) {
	foreach($data as $i => $v) {
		echo '<option value="' . $v->Name . '">';
	}
}

function getProducts($data) {
	foreach($data as $i => $v) {
		echo '<option value="' . $v->Name . '">';
	}
}

function getPrices($data) {
	foreach($data as $i => $v) {
		if ($v->SalesPrice != 0.00) {
			echo '<option value="' . $v->SalesPrice . '">';
		}
	}
}

$invoiceDataObjects = $ec->getAllInvoices();

if (isset($_POST['makeInvoice'])) {
	
	foreach ($customerDataArray as $i => $v) {
		if ($v->Name == $_POST['icname']) {
			$debtorNumberObj = (object) array('Number' => $v->Number);
		}
	}													
	$date = new DateTime($_POST['sidate']);
	$ec->singleInvoiceDraft($debtorNumberObj, $date, $_POST['product'], $_POST['price']);
	echo "<meta http-equiv='refresh' content='0'>";
}

if (isset($_POST['generateInvoices'])) {
	$ids = SQL("bikedesk", "SELECT DISTINCT storeid FROM storeprices ORDER BY storeid ASC");
	$data;
	foreach ($ids as $i => $v) {
		$sid = $v['storeid'];
		$data[] = SQL("bikedesk", "SELECT product, price FROM storeprices WHERE storeid = $sid");		
	}
	
	$ec->makeInvoiceDraft($data, $ids, $_POST['invDate']);
	echo "<meta http-equiv='refresh' content='0'>";
}

$accountDataObjects = $ec->getAllAccounts();

if (isset($_POST['addAccount'])) {
	$ec->addAccount($_POST['ano'], $_POST['aname'], $_POST['atype'], $_POST['ptype']);
	echo "<meta http-equiv='refresh' content='0'>";
}

$customerGroupDataObjects = $ec->getAllDebtorGroups();

function getAccounts($data) {
	foreach($data as $i => $v) {
		echo '<option value="' . $v->Name . '">';
	}
}

if (isset($_POST['addcg'])) {
	
	foreach ($accountDataObjects as $i => $v) {
		if ($v->Name == $_POST['cga']) {
			$ano = $v->Number;
		}
	}
	$ec->addDebtorGroup($_POST['cgno'], $_POST['cgname'], $ano);
	echo "<meta http-equiv='refresh' content='0'>";
}

$orderDataObjects = $ec->getAllOrders();
?>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<title>bikedesk e-conomic SOAP API</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<style type="text/css">
 		body { font-family: Verdana; width:80%; margin: auto; }
 		td { font-size: 13px;}
		.my-input input {width:30%;}
		.my-input2 input {width:20%;}
		
		#price-div input {
			width:60%;
		}
		
		#p-div input {
			width:80%;
			margin-left:15%;
			margin-right:0;
		}
		
		table.scroll {
			/* border-collapse: collapse; */
			border-spacing: 0;
			//border: 2px solid black;
			width:100%;
		}

		table.scroll tbody, table.scroll thead { 
			display: block; 
		}

		thead tr th { 
			height: 30px;
			line-height: 30px;
			/* text-align: left; */
		}

		table.scroll tbody {
			height: 300px;
			overflow-y: auto;
			overflow-x: hidden;
		}

		tbody { 
			//border-top: 2px solid black; 
		}

		tbody td, thead th {
			//border-right: 1px solid black;
			/* white-space: nowrap; */
			width: 15%;
		}

		tbody td:last-child, thead th:last-child {
			//border-right: none;
		}
	</style>
</head>
<body>
	<header class="row">
		<div class="col-md-12">
			<div class="thumbnail">
				<a href="/test/img/ehd.png">
					<img src="/test/img/ba.png" alt="API" style="width:100%">
					<div class="caption">
						<h1 style="text-align:center">Economic Interface Beta Version</h1>
					</div>
				</a>
			</div>
		</div>
	</header>
	<nav class="container-fluid" style="margin:4% 0 7% 0">
		<a href="#customers" class="col-sm-2">Customers</a>
		<a href="#products" class="col-sm-2">Products</a>
		<a href="#invoices" class="col-sm-2">Invoices</a>
		<a href="#accounts" class="col-sm-2">Accounts</a>
		<a href="#cgroups" class="col-sm-2">CustomerGroups</a>
		<a href="#orders" class="col-sm-2">Orders</a>
	</nav>
	<h1 class="page-header" style="margin-bottom:8%;text-align:center">Customers</h1>
	<section class="table-responsive" id="customers">
		<table class="scroll table table-hover">
			<thead>
				<tr>
					<th>No</th>
					<th>Name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Postcode</th>
					<th>City</th>
					<th>Country</th>
					<th>Cvr</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($customerDataArray as $i => $row) : ?>
				<tr>
					<td><?php if (property_exists($row,'Number')) { print $row->Number; } ?></td>
					<td><?php if (property_exists($row,'Name')) { print $row->Name; } ?></td>
					<td><?php if (property_exists($row,'Email')) { print $row->Email; } ?></td>
					<td><?php if (property_exists($row,'Address')) { print $row->Address; } ?></td>
					<td><?php if (property_exists($row,'PostalCode')) { print $row->PostalCode; } ?></td>
					<td><?php if (property_exists($row,'City')) { print $row->City; } ?></td>
					<td><?php if (property_exists($row,'Country')) { print $row->Country; } ?></td>
					<td><?php if (property_exists($row,'CINumber')) { print $row->CINumber; } ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<section class="container-fluid">
		<h1 style="text-align:center;margin:8% 0">Create Customer</h1>
		<form class="form-horizontal col-sm-offset-4" action="<?php echo htmlspecialchars($me);?>" method="post">
			<div class="form-group">
				<label class="control-label col-sm-2" for="cno">Number:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="cno" name="cno" placeholder="Enter customer number"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="cname">Name:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="cname" name="cname" placeholder="Enter customer name"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="cemail">Email:</label>
				<div class="my-input">
					<input type="email" class="form-control" id="cemail" name="cemail" placeholder="Enter customer email"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="caddress">Address:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="caddress" name="caddress" placeholder="Enter customer address"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="cpost">PostCode:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="cpost" name="cpost" placeholder="Enter customer post code"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="ccity">City:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="ccity" name="ccity" placeholder="Enter customer city"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="ccountry">Country:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="ccountry" name="ccountry" placeholder="Enter customer country"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="ccvr">CVR:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="ccvr" name="ccvr" placeholder="Enter customer cvr"/>
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-offset-4 col-sm-10">
					<button type="submit" name="addCustomer" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
	</section>
	<h1 class="page-header" style="margin-bottom:8%;text-align:center">Products</h1>
	<section class="table-responsive" id="products">
		<table class="scroll table table-hover">
			<thead>
				<tr>
					<th>No</th>
					<th>Name</th>
					<th>Price</th>
					<th>Group</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($productDataObjects as $i => $row) : ?>
				<tr>
					<td><?php if (property_exists($row,'Number')) { print $row->Number; } ?></td>
					<td><?php if (property_exists($row,'Name')) { print $row->Name; } ?></td>
					<td><?php if (property_exists($row,'SalesPrice')) { print $row->SalesPrice; } ?></td>
					<td><?php if (property_exists($row,'ProductGroupHandle')) { print $row->ProductGroupHandle->Number; } ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<section class="container-fluid">
		<h1 style="text-align:center;margin:8% 0">Create Product</h1>
		<form class="form-horizontal col-sm-offset-4" action="<?php echo htmlspecialchars($me);?>" method="post">
			<div class="form-group">
				<label class="control-label col-sm-2" for="pno">Number:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="pno" name="pno" placeholder="Enter product number"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pname">Name:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="pname" name="pname" placeholder="Enter product name"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pprice">Price:</label>
				<div class="my-input">
					<input type="number" class="form-control" id="pprice" name="pprice" placeholder="Enter product price"/>
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-offset-4 col-sm-10">
					<button type="submit" name="addProduct" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
	</section>
	<h1 class="page-header" style="margin-bottom:8%;text-align:center">Invoices</h1>
	<section class="table-responsive" id="invoices">
		<table class="scroll table table-hover" style="width:68%;margin-left:25%">
			<thead>
				<tr>
					<th>No</th>
					<th>Date</th>
					<th>CusNo</th>
					<th>CusName</th>
					<th>Net</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($invoiceDataObjects as $i => $row) : ?>
				<tr>
					<td><?php if (property_exists($row,'Id')) { print $row->Id; } ?></td>
					<td><?php if (property_exists($row,'Date')) { $val = new DateTime($row->Date); print $val->format('Y-m-d'); } ?></td>	
					<td><?php if (property_exists($row,'DebtorHandle')) { print $row->DebtorHandle->Number; } ?></td>
					<td><?php if (property_exists($row,'DebtorName')) { print $row->DebtorName; } ?></td>
					<td><?php if (property_exists($row,'NetAmount')) { print $row->NetAmount; } ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<section class="container-fluid">
		<h1 style="text-align:center;margin:8% 0">Create Single Invoice</h1>
		<form class="form-horizontal col-sm-offset-4" action="<?php echo htmlspecialchars($me);?>" method="post">
			<div class="form-group" style="margin-left:10%">
				<label for="icname">CusNo:</label>
				<div class="my-input">
					<input type="text" class="form-control" id="icname" name="icname" list="cus" placeholder="select customer"/>
					<datalist id="cus">
						<?php getCustomers($customerDataArray) ?>
					</datalist>
				</div>
			</div>
			<div class="form-group" style="margin-left:10%;padding-bottom:2%">
				<label for="sidate">Date:</label>
				<div class="my-input">
					<input type="date" class="form-control" id="sidate" name="sidate"/>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-4">
					<label for="ip" style="margin-left:15%">Product:</label><button class="add btn-xs btn-success">add</button>
					<div id="p-div">
						<input type="text" class="form-control" id="ip" name="product[]" list="prod" placeholder="Select name"/>
						<datalist id="prod">
							<?php getProducts($productDataObjects) ?>
						</datalist>
					</div>
				</div>
				<div class="form-group col-md-4">
					<label for="ipp">Price:</label>
					<div id="price-div">
						<input type="number" class="form-control" id="ipp" name="price[]" list="pric" placeholder="Enter/select"/>
						<datalist id="pric">
							<?php getPrices($productDataObjects); ?>
						</datalist>
					</div>
				</div>
			</div>	
			<div class="form-group"> 
				<div class="col-sm-10" style="margin-left:20%">
					<button type="submit" name="makeInvoice" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
	</section>
	<section class="container-fluid">
		<h1 style="text-align:center;margin:8% 0">Generate Invoices From Database</h1>
		<form class="form-horizontal col-sm-offset-4" action="<?php echo htmlspecialchars($me);?>" method="post">
			<div class="form-group">
				<label class="control-label col-sm-2" for="invDate">Date:</label>
				<div>
					<input type="date" class="form-control" id="invDate" name="invDate" style="width:22%"/>
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-10" style="margin-left:18%">
					<button type="submit" name="generateInvoices" class="btn btn-primary btn-md">Generate All</button>
				</div>
			</div>
		</form>
	</section>
	<h1 class="page-header" style="margin-bottom:8%;text-align:center">Accounts</h1>
	<section class="table-responsive" id="accounts">
		<table class="scroll table table-hover">
			<thead>
				<tr>
					<th>No</th>
					<th>Name</th>
					<th>Debit/Credit</th>
					<th>Vat</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($accountDataObjects as $i => $row) : ?>
				<tr>
					<td><?php if (property_exists($row,'Number')) { print $row->Number; } ?></td>
					<td><?php if (property_exists($row,'Name')) { print $row->Name; } ?></td>
					<td><?php if (property_exists($row,'DebitCredit')) { print $row->DebitCredit; } ?></td>
					<td><?php if (property_exists($row,'VatAccountHandle')) { print $row->VatAccountHandle->VatCode; } ?></td>
					<td><?php if (property_exists($row,'Balance')) { print $row->Balance; } ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<section class="container-fluid">
		<h1 style="text-align:center;margin:8% 0">Create Account</h1>
		<form class="form-horizontal col-sm-offset-4" action="<?php echo htmlspecialchars($me);?>" method="post">
			<div class="form-group">
				<label class="control-label col-sm-2" for="ano">Number:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="ano" name="ano" placeholder="Enter account number"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="aname">Name:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="aname" name="aname" placeholder="Enter account name"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="atype">Type:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="atype" name="atype" list="types" placeholder="Select account type"/>
					<datalist id="types">
						<option value="ProfitAndLoss"></option>
						<option value="Status"></option>
						<option value="TotalFrom"></option>
						<option value="Heading"></option>
						<option value="HeadingStart"></option>
						<option value="SumInterval"></option>
						<option value="SumAlpha"></option>
					</datalist>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="ptype">Debit/Credit:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="ptype" name="ptype" list="ptypes" placeholder="Select account type"/>
					<datalist id="ptypes">
						<option value="Debit"></option>
						<option value="Credit"></option>
					</datalist>
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-offset-3 col-sm-10">
					<button type="submit" name="addAccount" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
	</section>
	<h1 class="page-header" style="margin-bottom:8%;text-align:center">Customer Groups</h1>
	<section class="table-responsive" id="cgroups">
		<table class="scroll table table-hover" style="width:50%;margin-left:35%">
			<thead>
				<tr>
					<th>No</th>
					<th>Name</th>
					<th>Account</th>
					<th>Layout</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($customerGroupDataObjects as $i => $row) : ?>
				<tr>
					<td><?php if (property_exists($row,'Number')) { print $row->Number; } ?></td>
					<td><?php if (property_exists($row,'Name')) { print $row->Name; } ?></td>
					<td><?php if (property_exists($row,'AccountHandle')) { print $row->AccountHandle->Number; } ?></td>
					<td><?php if (property_exists($row,'LayoutHandle')) { print $row->LayoutHandle->Id; } ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<section class="container-fluid">
		<h1 style="text-align:center;margin:8% 0">Create Customer Group</h1>
		<form class="form-horizontal col-sm-offset-4" action="<?php echo htmlspecialchars($me);?>" method="post">
			<div class="form-group">
				<label class="control-label col-sm-2" for="cgno">Number:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="cgno" name="cgno" placeholder="Enter number"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="cgname">Name:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="cgname" name="cgname" placeholder="Enter name"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="cga">Account:</label>
				<div class="my-input2">
					<input type="text" class="form-control" id="cga" name="cga" list="cg" placeholder="Select account"/>
					<datalist id="cg">
						<?php getAccounts($accountDataObjects); ?>
					</datalist>
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-offset-3 col-sm-10">
					<button type="submit" name="addcg" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
	</section>
	<h1 class="page-header" style="margin-bottom:8%;text-align:center">Orders</h1>
	<section class="table-responsive" id="cgroups">
		<table class="scroll table table-hover" style="width:100%;">
			<thead>
				<tr>
					<th>Id</th>
					<th>No</th>
					<th>OrderDate</th>
					<th>Customer</th>
					<th>Address</th>
					<th>DelAddress</th>
					<th>DelDate</th>
					<th>Net</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($orderDataObjects as $i => $row) : ?>
				<tr>
					<td><?php if (property_exists($row,'Id')) { print $row->Id; } ?></td>
					<td><?php if (property_exists($row,'Number')) { print $row->Number; } ?></td>
					<td><?php if (property_exists($row,'Date')) { $val = new DateTime($row->Date); print $val->format('Y-m-d'); } ?></td>
					<td><?php if (property_exists($row,'DebtorName')) { print $row->DebtorName; } ?></td>
					<td><?php if (property_exists($row,'DebtorAddress')) { print $row->DebtorAddress; } ?></td>
					<td><?php if (property_exists($row,'DeliveryAddress')) { print $row->DeliveryAddress; } ?></td>
					<td><?php if (property_exists($row,'DeliveryDate')) { $val2 = new DateTime($row->DeliveryDate); print $val2->format('Y-m-d'); } ?></td>
					<td><?php if (property_exists($row,'NetAmount')) { $val3= $row->NetAmount; print number_format($val3, 2, '.', ''); } ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<script>
		var count = 0;
		$(function(){
			$(".add").click(function(e){
				e.preventDefault();
				count += 1;
				$("#p-div").append('<input type="text" class="form-control" id="product' + count + '" name="product[]" list="prod"/>');
				$("#price-div").append('<input type="number" class="form-control" id="price' + count + '" name="price[]" list="pric"/>');
			});
		});
	</script>
	<script>
		var $table = $('table.scroll'),
		$bodyCells = $table.find('tbody tr:first').children(),
		colWidth;

		// Adjust the width of thead cells when window resizes
		$(window).resize(function() {
			// Get the tbody columns width array
			colWidth = $bodyCells.map(function() {
				return $(this).width();
			}).get();
    
			// Set the width of thead columns
			$table.find('thead tr').children().each(function(i, v) {
				$(v).width(colWidth[i]);
			});    
		}).resize(); // Trigger resize handler
	</script>
</body>
</html>