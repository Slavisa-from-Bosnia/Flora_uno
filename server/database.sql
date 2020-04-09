CREATE DATABASE flora_uno;

CREATE TABLE roses (
rose_id SERIAL PRIMARY KEY,
description VARCHAR (255)
);

CREATE TABLE buyers (
    buyer_id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    city VARCHAR (100),
    address VARCHAR (100),
    phone VARCHAR (100),
    email VARCHAR (100),
    data_of_signing DATE NOT NULL DEFAULT CURRENT_DATE,
    password VARCHAR (1000)

);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    rose_id INT,
    buyer_id INT,
    date_of_order DATE NOT NULL DEFAULT CURRENT_DATE,
    ship_to VARCHAR (100),
    payment_method VARCHAR (100)

);
