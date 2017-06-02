<?php
class Account {
 
    // database connection and table name
    private $conn;
    private $table_name = "account";
 
    // object properties
    public $number;
    public $name;
    public $type;
	public $card;
    public $vat;
	public $balance;
    public $created;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read accounts
	function read() {
 
		// select all query
		$query = "SELECT number, name, type, card, vat, balance, created FROM " . $this->table_name . " ORDER BY created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	// create account
	function create() {
 
		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET number=:number, name=:name, type=:type, card=:card, 
			vat=:vat, balance=:balance, created=:created";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->number=htmlspecialchars(strip_tags($this->number));
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->type=htmlspecialchars(strip_tags($this->type));
		$this->card=htmlspecialchars(strip_tags($this->card));
		$this->vat=htmlspecialchars(strip_tags($this->vat));
		$this->balance=htmlspecialchars(strip_tags($this->balance));
		$this->created=htmlspecialchars(strip_tags($this->created));
		
		// bind values
		$stmt->bindParam(":number", $this->number);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":type", $this->type);
		$stmt->bindParam(":card", $this->card);
		$stmt->bindParam(":vat", $this->vat);
		$stmt->bindParam(":balance", $this->balance);
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
		$query = "SELECT number, name, type, card, vat, balance FROM " . $this->table_name . " WHERE number = ? LIMIT 0,1";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// bind number of account to be updated
		$stmt->bindParam(1, $this->number);
 
		// execute query
		$stmt->execute();
 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		// set values to object properties
		$this->name = $row['name'];
		$this->type = $row['type'];
		$this->card = $row['card'];
		$this->vat = $row['vat'];
		$this->balance = $row['balance'];
	}
	
	// update the account
	function update() {
 
		// update query
		$query = "UPDATE " . $this->table_name . " SET name=:name, type=:type, card=:card, 
			vat=:vat, balance=:balance WHERE number=:number";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->type=htmlspecialchars(strip_tags($this->type));
		$this->card=htmlspecialchars(strip_tags($this->card));
		$this->vat=htmlspecialchars(strip_tags($this->vat));
		$this->balance=htmlspecialchars(strip_tags($this->balance));
    
		// bind new values
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':type', $this->type);
		$stmt->bindParam(':card', $this->card);
		$stmt->bindParam(':vat', $this->vat);
		$stmt->bindParam(':balance', $this->balance);
 
		// execute the query
		if($stmt->execute()) {
			return true;
		} else {
			return false;
		}
	}
	
	// delete the account
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