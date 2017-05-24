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

CREATE TABLE IF NOT EXISTS `invoice` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `cusNo` int NOT NULL,  
  `total` double,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

CREATE TABLE IF NOT EXISTS `account` (
  `number` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `type`enum('ProfitAndLoss', 'Status', 'TotalFrom', 'Heading', 'HeadingStart', 'SumInterval', 'SumAlpha'),  
  `card` enum('Credit', 'Debit'),
  `vat` varchar(10) NOT NULL,
  `balance` double, 
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`number`)
)

CREATE TABLE IF NOT EXISTS `productgroup` (
  `number` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `vatAcc`SMALLINT,  
  `noVatAcc` SMALLINT,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`number`)
)

CREATE TABLE IF NOT EXISTS `customergroup` (
  `number` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `account` SMALLINT NOT NULL,  
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`number`)
)

CREATE TABLE IF NOT EXISTS `order` (
  `id` int NOT NULL,
  `cusNo` varchar(50) NOT NULL,
  `date` datetime,
   delAddress varchar(255),
   delZip varchar(10),
   delCity varchar(150),
   delCountry varchar(100),
   delTerms varchar(100),
   delDate datetime,
  `total` double,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)