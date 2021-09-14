const inquirer = require('inquirer');
const mysql = require('mysql2');

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

const init = function() {
      inquirer.prompt(mainMenu)
      .then((menu) =>{
            switch(menu.action) {
                  case 'View all departments':
                  // Show departments code
                  console.info('Departments')
                  break;
                  
                  case 'View all roles':
                  // Show all roles code
                  console.info('Roles')
                  break;

                  case 'View all employees':
                  // Show all employees code
                  console.info('Employees')
                  break;
            
                  case 'Add a department':
                  // Add a department code
                  console.info('Add a department')
                  break;
            
                  case 'Add a role':
                  // Add a role code
                  console.info('Add a role')
                  break;

                  case 'Add an employee':
                  // Add an employee code
                  console.info('Add an employee')
                  break;

                  case 'Update an employee role':
                  // Code to update an employee role
                  console.info('Update an employee role')
                  break;
            }
      })
}

init();
