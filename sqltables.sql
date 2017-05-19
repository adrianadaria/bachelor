CREATE TABLE IF NOT EXISTS `customer` (
  `number` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email`varchar(255),  
  `address` varchar(255),
  `postcode` varchar(25),
  `city` varchar(100),
  `country` varchar(100),
  `cvr` varchar(25),
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`number`)
)

CREATE TABLE IF NOT EXISTS `product` (
  `number` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price`double,  
  `group` integer,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`number`)
)