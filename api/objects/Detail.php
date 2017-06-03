<?php


class Detail {
    // database connection and table name
    private $conn;
    private $table_name = "detail";
 
    // object properties
    public $id;
    public $cusNo;
    public $pNo;
    public $price;
 
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }
	
	// read products
	function read() {
		// select all query
		$query = "SELECT DISTINCT cusNo FROM " . $this->table_name . " ORDER BY cusNo ASC";
		
		// prepare query statement
		$stmt = $this->conn->prepare($query);
 
		// execute query
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
		$details_arr = array();
		$details_arr["records"] = array();
		$dd = array();
		foreach($rows as $i => $row) { 
			
			$q = "SELECT d.pNo, d.price, p.name FROM " . $this->table_name . " d JOIN product p ON d.pNo = p.number WHERE d.cusNo = '$row'";
			$st = $this->conn->prepare($q);
			$st->execute();
			
			while ($line = $st->fetch(PDO::FETCH_ASSOC)) {
      
				extract($line);
 
				$detail_item = array(
					"pNo" => $pNo,
					"price" => $price,
					"name" => $name
				);

				array_push($dd, $detail_item);
			}
			
			$gg = array(
				"cusNo" => $row,
				"data" => $dd
			);
			$dd = [];
			array_push($details_arr["records"], $gg);
		}
		
		return $details_arr;
	}
	
	function getIds() {
		
		// select all query
		$query = "SELECT DISTINCT cusNo FROM " . $this->table_name . " ORDER BY cusNo ASC";
		
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		$stmt->execute();
		$ids = $stmt->fetchAll();
		return $ids;
		
	}

	function getData() {
		$ids = $this->getIds();
		$data = array();
		foreach ($ids as $i => $v) {
			$cid = $v['cusNo'];
			$q = "SELECT pNo, price FROM " . $this->table_name . "  WHERE cusNo = '$cid'";
			$st = $this->conn->prepare($q);
			$st->execute();
			$data[] = $st->fetchAll();	
		}
		return $data;
		
	}	
	
}