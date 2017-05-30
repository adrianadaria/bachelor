<?php
class ProductGroup {
 
    // database connection and table name
    private $conn;
    private $table_name = "productgroup";
 
    // object properties
    public $number;
    public $name;
    public $vatAcc;
    public $noVatAcc;
    public $created;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read products
	function read() {
 
		// select all query
		$query = "SELECT number, name, vatAcc, noVatAcc, created FROM " . $this->table_name . " ORDER BY created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	// create product
	function create() {
 
		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET number=:number, name=:name, vatAcc=:vatAcc, 
			noVatAcc=:noVatAcc, created=:created";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->number=htmlspecialchars(strip_tags($this->number));
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->vatAcc=htmlspecialchars(strip_tags($this->vatAcc));
		$this->noVatAcc=htmlspecialchars(strip_tags($this->noVatAcc));
		$this->created=htmlspecialchars(strip_tags($this->created));
		
		// bind values
		$stmt->bindParam(":number", $this->number);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":vatAcc", $this->vatAcc);
		$stmt->bindParam(":noVatAcc", $this->noVatAcc);
		$stmt->bindParam(":created", $this->created);
 
		// execute query
		if($stmt->execute()) {
			return true;
		}else{
			return false;
		}
	}
	
	// used when filling up the update product form
	function readOne() {
 
		// query to read single record
		$query = "SELECT number, name, vatAcc, noVatAcc FROM " . $this->table_name . " WHERE number = ? LIMIT 0,1";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// bind id of product to be updated
		$stmt->bindParam(1, $this->number);
 
		// execute query
		$stmt->execute();
 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		// set values to object properties
		$this->name = $row['name'];
		$this->vatAcc = $row['vatAcc'];
		$this->noVatAcc = $row['noVatAcc'];
	}
	
	// update the product
	function update() {
 
		// update query
		$query = "UPDATE " . $this->table_name . " SET name=:name, vatAcc=:vatAcc, noVatAcc=:noVatAcc WHERE number=:number";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->vatAcc=htmlspecialchars(strip_tags($this->vatAcc));
		$this->noVatAcc=htmlspecialchars(strip_tags($this->noVatAcc));
		$this->number=htmlspecialchars(strip_tags($this->number));
    
		// bind new values
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':vatAcc', $this->vatAcc);
		$stmt->bindParam(':noVatAcc', $this->noVatAcc);
		$stmt->bindParam(':number', $this->number);
 
		// execute the query
		if($stmt->execute()) {
			return true;
		} else {
			return false;
		}
	}
	
	// delete the product
	function delete() {
 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE number = ?";
 
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->number=htmlspecialchars(strip_tags($this->number));
 
		// bind id of record to delete
		$stmt->bindParam(1, $this->number);
 
		// execute query
		if($stmt->execute()) {
			return true;
		} else {
			return false;
		} 
	}
}