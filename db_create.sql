CREATE TABLE item_group (
  id SERIAL PRIMARY KEY CONSTRAINT pk_item_group NOT NULL,
  name VARCHAR(255) UNIQUE CONSTRAINT unique_item_group_name NOT NULL 
);

CREATE TYPE UNIT_OF_MEASUREMENT AS ENUM ('pcs','box','liter','kg');

CREATE TABLE item (
  id SERIAL PRIMARY KEY,
  item_group_id INT REFERENCES item_group(id) CONSTRAINT fk_item_group NOT NULL,
  unit_of_measurement UNIT_OF_MEASUREMENT DEFAULT 'pcs' NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(255) NOT NULL,
  storage_location TEXT, 
  contact_person TEXT,
  photo TEXT 
);

CREATE TYPE ROLE AS ENUM ('ADMIN', 'COORDINATOR', 'EMPLOYEE');

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL CONSTRAINT unique_account_email NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  role Role NOT NULL DEFAULT 'EMPLOYEE'
);

CREATE TYPE REQUEST_STATUS AS ENUM ('NEW', 'APPROVED', 'REJECTED');

CREATE TABLE request (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES account(id) CONSTRAINT fk_request_employee NOT NULL , 
  item_id INTEGER REFERENCES item(id) CONSTRAINT fk_request_item NOT NULL,

  quantity DECIMAL NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  comment TEXT,
  status REQUEST_STATUS DEFAULT 'NEW'
);