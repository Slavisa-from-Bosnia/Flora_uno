CREATE DATABASE flora_uno;

CREATE TABLE roses (
    rose_id SERIAL PRIMARY KEY,
    name VARCHAR (100),
    description VARCHAR (1000),
    image_url VARCHAR (100),
    initial_quantity INT,
    input_sum INT,
    output_sum INT,
    current_sum INT,
    reserved_sum INT,
    price INT
);

CREATE TABLE buyers (
    buyer_id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    city VARCHAR (100),
    address VARCHAR (100),
    phone VARCHAR (100),
    email VARCHAR (100),
    data_of_signing DATE NOT NULL DEFAULT CURRENT_DATE,
    password VARCHAR (1000),
    card_payment VARCHAR (100)
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    buyer_id INT,
    date_of_order DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method VARCHAR (100),
    shipping_method VARCHAR (100),
    shipped BOOLEAN,
    shipping_date DATE,
    delivered BOOLEAN,
    delivering_date DATE,
    payed BOOLEAN,
    adress_of_delivery VARCHAR (100),
    totalSum FLOAT
);


CREATE TABLE turnover (
    turnover_id SERIAL PRIMARY KEY,
    input BOOLEAN DEFAULT FALSE,
    descriptions VARCHAR (100),
    descriptions_id INT,
    roses_id INT,
    quantity INT
);