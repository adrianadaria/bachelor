<?php
class Invoice {
 
    // database connection and table name
    private $conn;
    private $table_name = "invoice";
 
    // object properties
    public $id;
    public $date;
    public $cusNo;
    public $total;
    public $created;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read invoices
	function read() {
 
		// select all query
		$query = "SELECT i.*, c.name, c.address, c.city, c.postcode, c.country, c.email FROM " . $this->table_name . 
		" i JOIN customer c ON i.cusNo = c.number ORDER BY i.created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	// create invoice
	function create() {
 
		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET id=:id, date=:date, cusNo=:cusNo, 
			total=:total, created=:created";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
		$this->date=htmlspecialchars(strip_tags($this->date));
		$this->cusNo=htmlspecialchars(strip_tags($this->cusNo));
		$this->total=htmlspecialchars(strip_tags($this->total));
		$this->created=htmlspecialchars(strip_tags($this->created));
		
		// bind values
		$stmt->bindParam(":id", $this->id);
		$stmt->bindParam(":date", $this->date);
		$stmt->bindParam(":cusNo", $this->cusNo);
		$stmt->bindParam(":total", $this->total);
		$stmt->bindParam(":created", $this->created);
 
		// execute query
		if($stmt->execute()) {
			return true;
		}else{
			return false;
		}
	}
	
	// used when filling up the update form
	function readOne() {
 
		// query to read single record
		$query = "SELECT i.*, c.name FROM " . $this->table_name . 
			" i JOIN customer c ON i.cusNo = c.number WHERE id = ? LIMIT 0,1";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// bind id of invoice to be updated
		$stmt->bindParam(1, $this->id);
 
		// execute query
		$stmt->execute();
 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		// set values to object properties
		$date = new DateTime($row['date']);
		$this->date = $date->format('Y-m-d');
		$this->cusNo = $row['cusNo'];
		$this->total = $row['total'];
		
		return $row['name'];
	}
	
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