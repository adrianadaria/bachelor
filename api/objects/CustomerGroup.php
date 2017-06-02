<?php
class CustomerGroup {
 
    // database connection and table name
    private $conn;
    private $table_name = "customergroup";
 
    // object properties
    public $number;
    public $name;
    public $account;
    public $layId;
    public $created;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read cgroups
	function read() {
 
		// select all query
		$query = "SELECT number, name, account, created FROM " . $this->table_name . " ORDER BY created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	// create cgroups
	function create() {
 
		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET number=:number, name=:name, account=:account, 
			created=:created";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->number=htmlspecialchars(strip_tags($this->number));
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->account=htmlspecialchars(strip_tags($this->account));
		$this->created=htmlspecialchars(strip_tags($this->created));
		
		// bind values
		$stmt->bindParam(":number", $this->number);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":account", $this->account);
		$stmt->bindParam(":created", $this->created);
 
		// execute query
		if($stmt->execute()) {
			return true;
		}else{
			return false;
		}
	}
	
	// used when filling up the update cgroups form
	function readOne() {
 
		// query to read single record
		$query = "SELECT number, name, account FROM " . $this->table_name . " WHERE number = ? LIMIT 0,1";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// bind number of cgroups to be updated
		$stmt->bindParam(1, $this->number);
 
		// execute query
		$stmt->execute();
 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		// set values to object properties
		$this->name = $row['name'];
		$this->account = $row['account'];
	}
	
	// update the cgroups
	function update() {
 
		// update query
		$query = "UPDATE " . $this->table_name . " SET name=:name, account=:account WHERE number=:number";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->account=htmlspecialchars(strip_tags($this->account));
		$this->number=htmlspecialchars(strip_tags($this->number));
    
		// bind new values
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':account', $this->account);
		$stmt->bindParam(':number', $this->number);
 
		// execute the query
		if($stmt->execute()) {
			return true;
		} else {
			return false;
		}
	}
	
	// delete the cgroups
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