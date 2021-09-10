DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

CREATE TABLE IF NOT EXISTS department (
      id INT PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      );

DROP TABLE IF EXISTS role
CREATE TABLE IF NOT EXISTS role (
      id INT PRIMARY KEY,
      title VARCHAR(30) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT NOT NULL,
      FOREIGN KEY (department_id) 
      REFERENCES department(id)
      );

DROP TABLE IF EXISTS role;
CREATE TABLE IF NOT EXISTS employee (
      id INT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id DECIMAL NOT NULL,
      manager_id INT NULL
      FOREIGN KEY (role_id)
      REFERENCES role(id)
      );