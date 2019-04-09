--DROP CREATE USE--
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

--CREATE a TABLE for products( id INT NOT NULL A_I, item_name VARCHAR(), department VARCHAR(), price DECIMAL (10,2), qty INT(), PRIMARY KEY(id); )--
CREATE TABLE products
( 
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(), 
    department VARCHAR(),
    price DECIMAL (10,2),
    qty INT(),
    PRIMARY KEY(id); 
)

(/* INSERT INTO products () VALUES ()*/
INSERT INTO products (item_name, department, price, qty)
VALUES ('baseball bat', 'sports', 25.50, 200), ('keyboard', 'music', 279.99, 125), ('mouse', 'pc', 79.99, 200), ('flashlight', 'outdoor', 13.62, 400), ('bluetooh speaker', 'music', 34.60, 15);