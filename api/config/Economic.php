<?php 

class Economic {
		
	private $agreementGrantToken;
	private $appSecretToken;
	private $client;
	private $wsdlUrl;
		
	public function __construct($grantToken, $secretToken) { //agreementGrantToken + appSecretToken
			
		$this->agreementGrantToken = $grantToken;
		$this->appSecretToken = $secretToken;
		$this->wsdlUrl = 'https://api.e-conomic.com/secure/api1/EconomicWebservice.asmx?WSDL';
			
		$this->client = new SoapClient(
			$this->wsdlUrl,
			array(
				"trace" => 1,
				"exceptions" => 1,
				"features" => SOAP_SINGLE_ELEMENT_ARRAYS
			)
		);
		
		$this->client->ConnectWithToken(
			array(
				'token'    => $this->agreementGrantToken,
				'appToken' => $this->appSecretToken
			)
		);
	}
	
	public function __destruct() {	//close connection
		$this->client->Disconnect();	
        //print("<p><b>The class was destroyed.</b></p>");
	}
	
	public function addDebtor($dNo, $dName, $dEmail, $dAddress, $dPostCode, $dCity, $dCountry, $dCvr) {	//add customer
		
		try
		{
			//Fetch first DebtorGroup
			$debtorGroupHandles = $this->client->debtorGroup_GetAll()->DebtorGroup_GetAllResult->DebtorGroupHandle;
			
			//Fetch second TermOfPayment
			$termOfPaymentHandles = $this->client->TermOfPayment_GetAll()->TermOfPayment_GetAllResult->TermOfPaymentHandle;
			
			//Add new customer/debtor
			$newDebtorFromData = $this->client->Debtor_CreateFromData(
				array( 'data' =>
					array(
						'Handle'				=> array('Number' => $dNo),
						'Number'            	=> $dNo,
						'DebtorGroupHandle' 	=> array_values($debtorGroupHandles)[0], //first group debtors
						'Name'              	=> $dName,
						'VatZone'           	=> 'HomeCountry',
						'CurrencyHandle'		=> array('Code' => 'DKK'),
						'IsAccessible'			=> true,
						'Ean'					=> null,
						'Email'					=> $dEmail,
						'Address'				=> $dAddress,
						'PostalCode'			=> $dPostCode,
						'City'					=> $dCity,
						'Country'				=> $dCountry,
						'CINumber'				=> $dCvr,
						'TermOfPaymentHandle'	=> array_values($termOfPaymentHandles)[1] //lobende maned 30dage
					)
				)
			)->Debtor_CreateFromDataResult;
			return $newDebtorFromData;
			print("<p>A new debtor has been created.</p>");
		} catch(Exception $e) {
			print("<p><b>Could not create debtor.</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
		
	}
	
	public function updateDebtor($dNo, $dName, $dEmail, $dAddress, $dPostCode, $dCity, $dCountry, $dCvr) {
		
		try
		{
			//Fetch first DebtorGroup
			$debtorGroupHandles = $this->client->debtorGroup_GetAll()->DebtorGroup_GetAllResult->DebtorGroupHandle;
			
			//Fetch second TermOfPayment
			$termOfPaymentHandles = $this->client->TermOfPayment_GetAll()->TermOfPayment_GetAllResult->TermOfPaymentHandle;
			
			//Add new customer/debtor
			$updateDebtorFromData = $this->client->Debtor_UpdateFromData (
				array( 'data' =>
					array(
						'Handle'				=> array('Number' => $dNo),
						'Number'            	=> $dNo,
						'DebtorGroupHandle' 	=> array_values($debtorGroupHandles)[0], //first group debtors
						'Name'              	=> $dName,
						'VatZone'           	=> 'HomeCountry',
						'CurrencyHandle'		=> array('Code' => 'DKK'),
						'IsAccessible'			=> true,
						'Ean'					=> null,
						'Email'					=> $dEmail,
						'Address'				=> $dAddress,
						'PostalCode'			=> $dPostCode,
						'City'					=> $dCity,
						'Country'				=> $dCountry,
						'CINumber'				=> $dCvr,
						'TermOfPaymentHandle'	=> array_values($termOfPaymentHandles)[1] //lobende maned 30dage
					)
				)
			)->Debtor_UpdateFromDataResult;
			return $updateDebtorFromData;
			print("<p>Debtor has been updated.</p>");
		} catch(Exception $e) {
			print("<p><b>Could not update debtor.</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function getAllDebtors() {	//get all customers
		
		try {
			
			// Fetch list of all debtors
			$debtorHandles = $this->client->Debtor_GetAll()->Debtor_GetAllResult->DebtorHandle;
			$debtorDataObjects = $this->client->Debtor_GetDataArray(array('entityHandles' => $debtorHandles))->Debtor_GetDataArrayResult->DebtorData;
			
			return $debtorDataObjects;
			
		} catch(Exception $e) {
			print("<p><b>Error occuried fetching all the debtors</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function deleteDebtor($no) {
		try {
			$numberArr = array('Number' => $no);
			$this->client->Debtor_Delete(array('debtorHandle' => $numberArr));
			return true;
		} catch(Exception $e) {
			print("<p><b>Error occuried deleting</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function addProduct($pNo, $pName, $group, $pPrice) { //create new product. requires number, name and price
		try {
			
			//$productGroupHandles = $this->client->ProductGroup_GetAll()->ProductGroup_GetAllResult->ProductGroupHandle;
			$productGroupHandle = array('Number' => $group);
			
			$newProduct = $this->client->Product_Create(
				array(
					"number" => $pNo,
					"productGroupHandle" => $productGroupHandle,//$productGroupHandles[10],
					"name" => $pName
				)
			)->Product_CreateResult;
			
			$productNumberObject = (object) array('Number' => $pNo);
			
			$this->client->Product_SetSalesPrice(
				array(
				"productHandle" => $productNumberObject,
				"value" => $pPrice
				)
			);

			$this->client->Product_SetIsAccessible(
				array(
				"productHandle" => $productNumberObject,
				"value" => "true"
				)
			); 	
		
			print("<p><b>New product have been inserted!</b></p>");

		} catch(Exception $e) {
			print("<p><b>Could not create product.</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}	
	}
	public function aaa() {
		$productGroupHandles = $this->client->ProductGroup_GetAll()->ProductGroup_GetAllResult->ProductGroupHandle;
		return $productGroupHandles;
	}
	
	public function updateProduct($number, $name, $group, $price) {
		try {
			$productGroupHandles = $this->client->ProductGroup_GetAll()->ProductGroup_GetAllResult->ProductGroupHandle;
			$updateProductObject = $this->client->Product_UpdateFromData(
				array( 'data' =>
					array(
						'Handle'			 => array('Number' => $number),
						'Number'             => $number,
						'ProductGroupHandle' => array_values($productGroupHandles)[11],
						'Name'               => $name,
						'SalesPrice' 		 => doubleval($price),
						'CostPrice' 		 => 0.00,
						'RecommendedPrice' 	 => 0.00,
						'IsAccessible'		 => true,
						'Volume'			 => 0.00
					)
				)
			)->Product_UpdateFromDataResult->Number;
			return true;//$updateProductObject;	
		} catch(Exception $e) {
			print("<p><b>Error occuried updating</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function deleteProduct($number) {
		
		try {
			$numberArr = array('Number' => $number);
			$this->client->Product_Delete(array('productHandle' => $numberArr));
			return true;
		} catch(Exception $e) {
			print("<p><b>Error occuried deleting</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function getAllProducts() {	//get all products
		
		try {
			
			// Fetch list of all products
			$productHandles = $this->client->Product_GetAll()->Product_GetAllResult->ProductHandle;
			$productDataObjects = $this->client->Product_GetDataArray(array('entityHandles' => $productHandles))->Product_GetDataArrayResult->ProductData;
			
			return $productDataObjects;
			
		} catch(Exception $e) {
			print("<p><b>Error occuried fetching all the products</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
		
	}
		
	public function getString() {
		return $this->wsdlUrl;
	}
	
	public function makeInvoiceDraft($data, $ids, $invDate) {	//generate invoices for all debtors
		
		try {
		
			foreach ($data as $i => $item) {

				//getting info
				$debtorNumberObj = (object) array('Number' => $ids[$i]['storeid']); 	//storeid = customer number in e-conomic
				$date = new DateTime($invDate);
										
				//creating invoice with some options
				$newCurrentInvoiceHandle = $this->client->CurrentInvoice_Create(array('debtorHandle' => $debtorNumberObj))->CurrentInvoice_CreateResult;
				$this->client->CurrentInvoice_SetDate(array('currentInvoiceHandle' => $newCurrentInvoiceHandle, 'value' => $date->format('c')));
										
				foreach ($item as $key => $value) {
			
					//insert invoice line for each product with product information
					$newCurrentInvoiceLineHandle = $this->client->CurrentInvoiceLine_Create(array('invoiceHandle' => $newCurrentInvoiceHandle))->CurrentInvoiceLine_CreateResult;
					$productNumberObj = (object) array('Number' => $value['product']);
					$productObject = $this->client->Product_GetData(array('entityHandle' => $productNumberObj))->Product_GetDataResult;
					$this->client->CurrentInvoiceLine_SetProduct(array('currentInvoiceLineHandle' => $newCurrentInvoiceLineHandle, 'valueHandle' => $productNumberObj));
					$this->client->CurrentInvoiceLine_SetDescription(array('currentInvoiceLineHandle' => $newCurrentInvoiceLineHandle, 'value' => $productObject->Name));
					$this->client->CurrentInvoiceLine_SetUnitNetPrice(array('currentInvoiceLineHandle' => $newCurrentInvoiceLineHandle, 'value' => $value['price'])); //def $productObject->SalesPrice
				}	
			}
			print("<p><b>The draft invoices were generated!</b></p>");
			
		} catch(Exception $e) {
			print("<p><b>Could not create invoice</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function singleInvoiceDraft($cno, $date, $products, $prices) {
		try {
			$newCurrentInvoiceHandle = $this->client->CurrentInvoice_Create(array('debtorHandle' => $cno))->CurrentInvoice_CreateResult;
			$this->client->CurrentInvoice_SetDate(array('currentInvoiceHandle' => $newCurrentInvoiceHandle, 'value' => $date->format('c')));
		
			foreach ($products as $i => $v) {
				$productHandles = $this->client->Product_FindByName(array('name' => $v))->Product_FindByNameResult->ProductHandle; 
				$newCurrentInvoiceLineHandle = $this->client->CurrentInvoiceLine_Create(array('invoiceHandle' => $newCurrentInvoiceHandle))->CurrentInvoiceLine_CreateResult;
			
				$this->client->CurrentInvoiceLine_SetProduct(array('currentInvoiceLineHandle' => $newCurrentInvoiceLineHandle, 'valueHandle' => $productHandles[0]));
				$this->client->CurrentInvoiceLine_SetDescription(array('currentInvoiceLineHandle' => $newCurrentInvoiceLineHandle, 'value' => $v));
				$this->client->CurrentInvoiceLine_SetUnitNetPrice(array('currentInvoiceLineHandle' => $newCurrentInvoiceLineHandle, 'value' => $prices[$i]));
			}
			print("<p><b>Invoice was created!</b></p>");
		
		} catch(Exception $e) {
			print("<p><b>Could not create invoice</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function getAllInvoices() {	//get all invoice drafts
		
		try {
			
			// Fetch list of all invoices
			$invoiceHandles = $this->client->CurrentInvoice_GetAll()->CurrentInvoice_GetAllResult->CurrentInvoiceHandle;
			$invoiceDataObjects = $this->client->CurrentInvoice_GetDataArray(array('entityHandles' => $invoiceHandles))->CurrentInvoice_GetDataArrayResult->CurrentInvoiceData;
			
			return $invoiceDataObjects;
			
		} catch(Exception $e) {
			print("<p><b>Error occuried fetching all the invoices</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
		
	}

	public function bookElInvoiceDraft() {	//book invoice draft using otherReference; invoice sent not by email
		try {
			$currentInvoiceHandle = $this->client->CurrentInvoice_FindByOtherReference(
				array("otherReference" => "testing111")
			)->CurrentInvoice_FindByOtherReferenceResult->CurrentInvoiceHandle;  
		
			$sentInvoiceNumber = $this->client->CurrentInvoice_BookAndSendElectronicInvoice(
				array(
					"currentInvoiceHandle" => $currentInvoiceHandle[0],
					"mobilePay" => "false"
				)
			)->CurrentInvoice_BookAndSendElectronicInvoiceResult;
			print_r($sentInvoiceNumber);
			//print("<p><b>The invoice has been sent with number: " . $sentInvoiceNumber . "</b></p>");
		} catch(Exception $e) {
			print("<p><b>Error occuried sending electronic invoice</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function getAllAccounts() {
		try {
			
			$accountHandles = $this->client->Account_GetAll()->Account_GetAllResult->AccountHandle;
			$accountDataObjects = $this->client->Account_GetDataArray(array('entityHandles' => $accountHandles))->Account_GetDataArrayResult->AccountData;
			
			return $accountDataObjects;
		} catch(Exception $e) {
			print("<p><b>Error occuried getting account data</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}		
	}
	
	public function addAccount($no, $name, $type, $card) {
		
		try {
			$newAccount = $this->client->Account_CreateFromData(
				array( 'data' =>
					array(
						'Handle' => array('Number' => $no),
						'Number' => $no,
						'Name' => $name,
						'Type' => $type,
						'DebitCredit' => $card,
						'IsAccessible' => true,
						'BlockDirectEntries' => false,
						'VatAccountHandle' => array('VatCode' => 'U25'),
						'Balance' => 0.00
					)
				)
			)->Account_CreateFromDataResult;
			return true;
			print("<p><b>Account has been created!</b></p>");			
			
		} catch(Exception $e) {
			print("<p><b>Error occuried creating account</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function updateAccount($number, $name, $type, $card) {
		try {
			$updateAccount = $this->client->Account_UpdateFromData (
				array( 'data' =>
					array(
						'Handle' => array('Number' => $number),
						'Number' => $number,
						'Name' => $name,
						'Type' => $type,
						'DebitCredit' => $card,
						'IsAccessible' => true,
						'BlockDirectEntries' => false,
						'VatAccountHandle' => array('VatCode' => 'U25'),
						'Balance' => 0.00
					)
				)
			)->Account_UpdateFromDataResult;
			return $updateAccount;
			print("<p><b>Account has been updated!</b></p>");			
			
		} catch(Exception $e) {
			print("<p><b>Error occuried updating account</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function deleteAccount($number) {
		
		try {
			$numberArr = array('Number' => $number);
			$this->client->Account_Delete(array('accountHandle' => $numberArr));
			return true;
		} catch(Exception $e) {
			print("<p><b>Error occuried deleting</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		} 
	}
	
	public function addDebtorGroup($no, $name, $ano) {
		try {
			$newDebtorGroup = $this->client->DebtorGroup_CreateFromData (
				array( 'data' =>
					array(
						'Handle' => array('Number' => $no),
						'Number' => $no,
						'Name' => $name,
						'AccountHandle' => array('Number' => $ano)
						//'LayoutHandle' => array('Id' => $id)
					)
				)
			)->DebtorGroup_CreateFromDataResult;
			return $newDebtorGroup;
			print("<p><b>Customer group has been created!</b></p>");	
			
		} catch(Exception $e) {
			print("<p><b>Error occuried creating customer group</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function updateDebtorGroup($no, $name, $ano) {
		try {
			$updateDebtorGroup = $this->client->DebtorGroup_UpdateFromData (
				array( 'data' =>
					array(
						'Handle' => array('Number' => $no),
						'Number' => $no,
						'Name' => $name,
						'AccountHandle' => array('Number' => $ano)
						//'LayoutHandle' => array('Id' => $id)
					)
				)
			)->DebtorGroup_UpdateFromDataResult;
			return $updateDebtorGroup;
			print("<p><b>Customer group has been updated!</b></p>");	
			
		} catch(Exception $e) {
			print("<p><b>Error occuried updating customer group</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function getAllDebtorGroups() {
		try {
			
			$debtorGroupHandles = $this->client->DebtorGroup_GetAll()->DebtorGroup_GetAllResult->DebtorGroupHandle;
			$debtorGroupDataObjects = $this->client->DebtorGroup_GetDataArray(array('entityHandles' => $debtorGroupHandles))->DebtorGroup_GetDataArrayResult->DebtorGroupData;
			
			return $debtorGroupDataObjects;
		} catch(Exception $e) {
			print("<p><b>Error occuried getting customer groups data</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}		
	}
	
	public function addProductGroup($no, $name, $vat, $noVat) {
		try {
			$newProductGroup = $this->client->ProductGroup_CreateFromData (
				array( 'data' =>
					array(
						'Handle' => array('Number' => $no),
						'Number' => $no,
						'Name' => $name,
						'AccountForVatLiableDebtorInvoicesCurrentHandle' => array('Number' => $vat),
						'AccountForVatExemptDebtorInvoicesCurrentHandle' => array('Number' => $noVat)
					)
				)
			)->ProductGroup_CreateFromDataResult;
			return $newProductGroup;
			print("<p><b>Product group has been created!</b></p>");	
			
		} catch(Exception $e) {
			print("<p><b>Error occuried creating product group</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function updateProductGroup($no, $name, $vat, $noVat) {
		try {
			$updatedProductGroup = $this->client->ProductGroup_UpdateFromData(
				array( 'data' =>
					array(
						'Handle' => array('Number' => $no),
						'Number' => $no,
						'Name' => $name,
						'AccountForVatLiableDebtorInvoicesCurrentHandle' => array('Number' => $vat),
						'AccountForVatExemptDebtorInvoicesCurrentHandle' => array('Number' => $noVat)
					)
				)
			)->ProductGroup_UpdateFromDataResult;
			return $updatedProductGroup;
			print("<p><b>Product group has been updated!</b></p>");	
			
		} catch(Exception $e) {
			print("<p><b>Error occuried updating product group</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
	
	public function deleteProductGroup($number) {
		
		try {
			$numberArr = array('Number' => $number);
			$this->client->ProductGroup_Delete(array('productGroupHandle' => $numberArr));
			return true;
		} catch(Exception $e) {
			print("<p><b>Error occuried deleting</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		} 
	}
	
	public function getAllProductGroups() {
		try {
			
			$productGroupHandles = $this->client->ProductGroup_GetAll()->ProductGroup_GetAllResult->ProductGroupHandle;
			$productGroupDataObjects = $this->client->ProductGroup_GetDataArray(array('entityHandles' => $productGroupHandles))->ProductGroup_GetDataArrayResult->ProductGroupData;
			
			return $productGroupDataObjects;
		} catch(Exception $e) {
			print("<p><b>Error occuried getting product groups data</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}		
	}
	
	public function getAllOrders() {
		try {
			$orderHandles = $this->client->Order_GetAll()->Order_GetAllResult->OrderHandle;
			$orderDataObjects = $this->client->Order_GetDataArray(array('entityHandles' => $orderHandles))->Order_GetDataArrayResult->OrderData;
			
			return $orderDataObjects;	
		} catch(Exception $e) {
			print("<p><b>Error occuried getting order data</b></p>");
			print("<p><i>" . $e->getMessage() . "</i></p>");
		}
	}
}
?>