DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
      id INT NOT NULL AUTO_INCREMENT,
      department_name VARCHAR(30),
      PRIMARY KEY(id)
      );

DROP TABLE IF EXISTS role;

CREATE TABLE role (
      role_id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255),
      salary INT,
      department_id INT NULL,
      FOREIGN KEY (department_id)
      REFERENCES department(id) 
      ON DELETE SET NULL,
      PRIMARY KEY(role_id)
      );

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
      employee_id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id INT NULL,
      manager_id INT NULL,
      FOREIGN KEY (role_id)
      REFERENCES role(role_id)
      ON DELETE SET NULL
      );