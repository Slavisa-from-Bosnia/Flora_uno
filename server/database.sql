CREATE DATABASE flora_uno;

CREATE TABLE roses (
    rose_id SERIAL PRIMARY KEY,
    name VARCHAR (100),
    description VARCHAR (1000),
    image_url VARCHAR (100),
    price FLOAT
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
    date_of_order TIMESTAMP NOT NULL DEFAULT NOW(),
    payment_method VARCHAR (100),
    shipping_method VARCHAR (100),
    shipped BOOLEAN DEFAULT FALSE,
    shipping_date DATE,
    delivered BOOLEAN DEFAULT FALSE,
    delivering_date DATE,
    payed BOOLEAN,
    adress_of_delivery VARCHAR (100),
    totalSum FLOAT
);


CREATE TABLE turnover (
    turnover_id SERIAL PRIMARY KEY,
    descriptions VARCHAR (100),
    descriptions_id INT,
    roses_id INT,
    quantity INT,
    price FLOAT,
    sumData FLOAT,
    dateOfTurnover TIMESTAMP NOT NULL DEFAULT NOW(),
    reserved INT DEFAULT 0
);