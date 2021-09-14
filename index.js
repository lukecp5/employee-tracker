const inquirer = require('inquirer');
const mysql = require('mysql2');
const disp = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
},
console.info('Connected to the employee database'));

const mainMenu = [
      {
            //view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                  'View all departments',
                  'View all roles',
                  'View all employees',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employee role'
            ]
      }
]

function cli() {
      inquirer.prompt(mainMenu)
      .then((menu) =>{
            switch(menu.action) {
                  case 'View all departments':
                  // Show departments code
                  showDepartments();
                  // console.info('Departments')
                  break;
                  
                  case 'View all roles':
                  // Show all roles code
                  showRoles();
                  // console.info('Roles')
                  break;

                  case 'View all employees':
                  // Show all employees code
                  showEmployees();
                  // console.info('Employees')
                  break;
            
                  case 'Add a department':
                  // Add a department code
                  addDepartment();
                  // console.info('Add a department')
                  break;
            
                  case 'Add a role':
                  // Add a role code
                  addRole();
                  // console.info('Add a role')
                  break;

                  case 'Add an employee':
                  // Add an employee code\
                  addEmployee();
                  // console.info('Add an employee')
                  break;

                  case 'Update an employee role':
                  updateEmployee();
                  // Code to update an employee role
                  // console.info('Update an employee role')
                  break;
            }
      })
}

function showDepartments() {
      let sql = 'SELECT id as department_id, department_name FROM department';
db.query(sql, (err, result) => {
      console.table(result);
      cli();
})
}

function showRoles() {
      let sql = 'SELECT role_id as id, title, salary, department_id FROM role INNER JOIN department on role.department_id = department.id';
      db.query(sql, (err, result) => {
            console.table(result);
            cli();
      })
}

function showEmployees() {
      let sql = 'SELECT employee.employee_id as id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name as department FROM employee INNER JOIN role on employee.role_id = role.role_id INNER JOIN department on role.department_id = department.id ORDER BY (employee.employee_id) ASC';
      db.query(sql, (err, result) => {
            if(err){
                  console.log(err);
            }
            console.table(result);
            cli();
      })
}

function addDepartment() {

      inquirer.prompt(
            {
                  name: 'department',
                  type: 'input',
                  message: 'Enter the name of the department you would like to add'
            })
            .then((answers)=>{
                  db.query('INSERT INTO department(department_name) VALUES (?)', answers.department, (err, result)=>{
                        if(err){
                              console.log(err);
                        }else{
                              console.log(result);
                        }
                        cli();
                  })
            })

}

function addRole(){

      let sql1 = "SELECT role.title AS role, role.salary, department.department_name FROM role INNER JOIN department ON department.id = role.department_id;";
      let sql2 = "SELECT department.department_name FROM department";

      db.query(sql1, (err, result) => {
            if(err){
                  console.log(err);
            }
            console.table(result);

            db.query(sql2, (err, result) => {
                  if(err){
                        console.log(err);
                  }
                  let departmentList = result;

                  let addRoleMenu = `[
                        {
                              name: 'newRole',
                              type: 'input',
                              message: 'What role would you like to add?'
                        },
                        {
                              name: 'salary',
                              type: 'input',
                              message: 'What is the salary for this new position?'
                        }

                  ]`;

            })

      })

}

function addEmployee() {

}

function updateEmployee(){

}

cli();
