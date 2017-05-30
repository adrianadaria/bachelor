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
	
	// read products
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
	
	// create product
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
	
	// used when filling up the update product form
	function readOne() {
 
		// query to read single record
		//$query = "SELECT number, name, group, price, created FROM " . $this->table_name . " WHERE number = ? LIMIT 0,1";
		$query = "SELECT number, name, `group`, price FROM " . $this->table_name . " WHERE number = ? LIMIT 0,1";
 
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
		$this->group = $row['group'];
		$this->price = $row['price'];
	}
	
	// update the product
	function update() {
 
		// update query
		$query = "UPDATE " . $this->table_name . " SET name=:name, `group`=:group, price=:price WHERE number=:number";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->group=htmlspecialchars(strip_tags($this->group));
		$this->price=htmlspecialchars(strip_tags($this->price));
		$this->number=htmlspecialchars(strip_tags($this->number));
    
		// bind new values
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':group', $this->group);
		$stmt->bindParam(':price', $this->price);
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
	
	// search products
	function search($keywords){
 
		// select all query
		$query = "SELECT id, name, description, price, created FROM " . $this->table_name . " WHERE
            name LIKE ? OR description LIKE ? ORDER BY created DESC";
 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$keywords = htmlspecialchars(strip_tags($keywords));
		$keywords = "%{$keywords}%";
 
		// bind
		$stmt->bindParam(1, $keywords);
		$stmt->bindParam(2, $keywords);
 
		// execute query
		$stmt->execute();
 
		return $stmt;
	}
	
	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){
 
		// select query
		$query = "SELECT id, name, description, price, created FROM " . $this->table_name . " ORDER BY created DESC LIMIT ?, ?";
 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
 
		// bind variable values
		$stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
		$stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
 
		// execute query
		$stmt->execute();
 
		// return values from database
		return $stmt;
	}
	
	// used for paging products
	public function count(){
		$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
 
		$stmt = $this->conn->prepare( $query );
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
 
		return $row['total_rows'];
	}
}