DROP DATABASE IF EXISTS pelicantown;

CREATE database pelicantown;

USE pelicantown;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product VARCHAR(60) NOT NULL,
    department VARCHAR(30) NULL,
    price DECIMAL(5,2) NULL,
    stock INT(5) DEFAULT 0,
    PRIMARY KEY (id)
);

SELECT * FROM products;