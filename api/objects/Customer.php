<?php
class Customer {
 
    // database connection and table name
    private $conn;
    private $table_name = "customer";
 
    // object properties
    public $number;
    public $name;
	public $email;
	public $address;
	public $postcode;
    public $city;
    public $country;
    public $cvr;
	public $created;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read products
	function read() {
 
		// select all query
		$query = "SELECT number, name, email, address, postcode, city, country, cvr, created FROM " . $this->table_name . " ORDER BY created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	public function emptyProp() {
		$this->email = '';
		$this->address = '';
		$this->postcode = '';
		$this->city = '';
		$this->country = '';
		$this->cvr = '';
	}
	
	// create product
	function create() {
 
		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET number=:number, name=:name, email=:email, 
			address=:address, postcode=:postcode, city=:city, country=:country, cvr=:cvr, created=:created";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->number=htmlspecialchars(strip_tags($this->number));
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->address=htmlspecialchars(strip_tags($this->address));
		$this->postcode=htmlspecialchars(strip_tags($this->postcode));
		$this->city=htmlspecialchars(strip_tags($this->city));
		$this->country=htmlspecialchars(strip_tags($this->country));
		$this->cvr=htmlspecialchars(strip_tags($this->cvr));
		$this->created=htmlspecialchars(strip_tags($this->created));
		
		// bind values
		$stmt->bindParam(":number", $this->number);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":address", $this->address);
		$stmt->bindParam(":postcode", $this->postcode);
		$stmt->bindParam(":city", $this->city);
		$stmt->bindParam(":country", $this->country);
		$stmt->bindParam(":cvr", $this->cvr);
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
		$query = "SELECT number, name, email, address, postcode, city, country, cvr FROM " . $this->table_name . " WHERE number = ? LIMIT 0,1";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// bind id of product to be updated
		$stmt->bindParam(1, $this->number);
 
		// execute query
		$stmt->execute();
 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
 
		// set values to object properties
		$this->number = $row['number'];
		$this->name = $row['name'];
		$this->email = $row['email'];
		$this->address = $row['address'];
		$this->postcode = $row['postcode'];
		$this->city = $row['city'];
		$this->country = $row['country'];
		$this->cvr = $row['cvr'];
	}
	
	// update the product
	function update() {
 
		// update query
		$query = "UPDATE " . $this->table_name . " SET name=:name, email=:email, address=:address, 
			postcode=:postcode, city=:city, country=:country, cvr=:cvr WHERE number=:number";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->number=htmlspecialchars(strip_tags($this->number));
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->address=htmlspecialchars(strip_tags($this->address));
		$this->postcode=htmlspecialchars(strip_tags($this->postcode));
		$this->city=htmlspecialchars(strip_tags($this->city));
		$this->country=htmlspecialchars(strip_tags($this->country));
		$this->cvr=htmlspecialchars(strip_tags($this->cvr));
		
		// bind values
		$stmt->bindParam(":number", $this->number);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":address", $this->address);
		$stmt->bindParam(":postcode", $this->postcode);
		$stmt->bindParam(":city", $this->city);
		$stmt->bindParam(":country", $this->country);
		$stmt->bindParam(":cvr", $this->cvr);
 
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
		$this->number = htmlspecialchars(strip_tags($this->number));
 
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