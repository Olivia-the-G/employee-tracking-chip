DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
	ID INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(ID)
);

CREATE TABLE roles (
	ID INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES departments(ID),
    PRIMARY KEY(ID)
);

CREATE TABLE employees (
	ID INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (role_id)
    REFERENCES roles(ID),
    FOREIGN KEY (manager_id)
    REFERENCES employees(ID)
);