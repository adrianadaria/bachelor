<?php
class Order {
 
    // database connection and table name
    private $conn;
    private $table_name = "`order`";
 
    // object properties
    public $id;
    public $cusNo;
	public $date;
    public $delAddress;
	public $delZip;
	public $delCity;
	public $delCountry;
	public $delTerms;
    public $delDate;
	public $total;
    public $created;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read order
	function read() {
 
		// select all query
		$query = "SELECT o.*, c.name FROM " . $this->table_name . 
		" o JOIN customer c ON o.cusNo = c.number ORDER BY o.created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	// create order
	function create() {
		// query to insert record
		$query = "INSERT INTO `order` SET id=:id, cusNo=:cusNo, date=:date, delAddress=:delAddress, delZip=:delZip, delCity=:delCity, 
			delCountry=:delCountry, delTerms=:delTerms, delDate=:delDate, total=:total, created=:created";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
		$this->cusNo=htmlspecialchars(strip_tags($this->cusNo));
		$this->date=htmlspecialchars(strip_tags($this->date));
		$this->delAddress=htmlspecialchars(strip_tags($this->delAddress));
		$this->delZip=htmlspecialchars(strip_tags($this->delZip));
		$this->delCity=htmlspecialchars(strip_tags($this->delCity));
		$this->delCountry=htmlspecialchars(strip_tags($this->delCountry));
		$this->delTerms=htmlspecialchars(strip_tags($this->delTerms));
		$this->delDate=htmlspecialchars(strip_tags($this->delDate));
		$this->total=htmlspecialchars(strip_tags($this->total));
		$this->created=htmlspecialchars(strip_tags($this->created));
		
		// bind values
		$date = new DateTime($this->date);
		$fdate = $date->format('Y-m-d H:i:s');
		if ($this->delDate !== '') { 
			$delDate = new DateTime($this->delDate); 
			$fdelDate = $delDate->format('Y-m-d H:i:s'); 
		}
		$stmt->bindParam(":id", $this->id);
		$stmt->bindParam(":cusNo", $this->cusNo);
		$stmt->bindParam(":date", $fdate);
		$stmt->bindParam(":delAddress", $this->delAddress);
		$stmt->bindParam(":delZip", $this->delZip);
		$stmt->bindParam(":delCity", $this->delCity);
		$stmt->bindParam(":delCountry", $this->delCountry);
		$stmt->bindParam(":delTerms", $this->delTerms);
		$stmt->bindParam(":delDate", $fdelDate);
		$stmt->bindParam(":total", $this->total);
		$stmt->bindParam(":created", $this->created);
	
		// execute query
		if($stmt->execute()) {
			return true;
		} else {
			return false;
		} 
	}
	
	// used when filling up the update form
	function readOne() {
 
		// query to read single record
		$query = "SELECT o.*, c.name FROM " . $this->table_name . 
		" o JOIN customer c ON o.cusNo = c.number WHERE id = ? LIMIT 0,1"; 
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// bind id of order to be updated
		$stmt->bindParam(1, $this->id);
 
		// execute query
		$stmt->execute();
 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		// set values to object properties
		$date = new DateTime($row['date']);
		$delDate = new DateTime($row['delDate']);
		$this->cusNo = $row['cusNo'];
		$this->date = $date->format('Y-m-d');
		$this->delAddress = $row['delAddress'];
		$this->delZip = $row['delZip'];
		$this->delCity = $row['delCity'];
		$this->delCountry = $row['delCountry'];
		$this->delTerms = $row['delTerms'];
		$this->delDate = $delDate->format('Y-m-d');
		$this->total = $row['total'];
		return $row['name'];
	}
	
	// delete the product
	function delete() {
 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
 
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
 
		// bind id of record to delete
		$stmt->bindParam(1, $this->id);
 
		// execute query
		if($stmt->execute()) {
			return true;
		} else {
			return false;
		} 
	}
	
}