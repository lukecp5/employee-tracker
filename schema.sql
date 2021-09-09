DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

CREATE TABLE IF NOT EXISTS department (
      id INT PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      );

CREATE TABLE IF NOT EXISTS role (
      id INT PRIMARY KEY,
      title VARCHAR(30) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT NOT NULL
      );

CREATE TABLE IF NOT EXISTS role (
      id INT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id DECIMAL NOT NULL,
      manager_id INT NULL
      );