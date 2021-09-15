const inquirer = require("inquirer");
const mysql = require("mysql2");
const disp = require("console.table");
const { forEach } = require("lodash");
require("dotenv").config();

// + Create the connection the mySQL database - hosted on localhost
const db = mysql.createConnection(
  {
    host: "localhost",
    // + MySQL login credentials pulled from the .env file with dotenv
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  // + Let's the user know they've successfully connected to the database
  console.info("Connected to the employee database")
);

// + Const holding the options for the main menu of the application, based on what the user selects, the application will perform any number of actions
const mainMenu = [
  {
    //view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];

// + Main application function. This gets called after each subordinate action is completed
function cli() {
  // + Prompt using mainMenu from above
  inquirer.prompt(mainMenu).then((menu) => {
    // + Switch case that performs functions based on the users selection on the main menu
    switch (menu.action) {
      case "View all departments":
        // Show departments code
        showDepartments();
        // console.info('Departments')
        break;

      case "View all roles":
        // Show all roles code
        showRoles();
        // console.info('Roles')
        break;

      case "View all employees":
        // Show all employees code
        showEmployees();
        // console.info('Employees')
        break;

      case "Add a department":
        // Add a department code
        addDepartment();
        // console.info('Add a department')
        break;

      case "Add a role":
        // Add a role code
        addRole();
        // console.info('Add a role')
        break;

      case "Add an employee":
        // Add an employee code\
        addEmployee();
        // console.info('Add an employee')
        break;

      case "Update an employee role":
        updateEmployee();
        // Code to update an employee role
        // console.info('Update an employee role')
        break;
    }
  });
}

// + Function that queries the department table for all of the departments in the employee_db
function showDepartments() {
  let sql = "SELECT id as department_id, department_name FROM department";
  db.query(sql, (err, result) => {
    // + Displays the department IDs and names in the format of a table inside the console.
    console.table(result);
    // + Run the main application function to bring the user back to the main menu
    cli();
  });
}

function showRoles() {
  let sql =
    "SELECT role_id as id, title, salary, department_id FROM role INNER JOIN department on role.department_id = department.id";
  db.query(sql, (err, result) => {
    console.table(result);
    // + Run the main application function to bring the user back to the main menu
    cli();
  });
}

function showEmployees() {
  let sql =
    "SELECT employee.employee_id as id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name as department FROM employee INNER JOIN role on employee.role_id = role.role_id INNER JOIN department on role.department_id = department.id ORDER BY (employee.employee_id) ASC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    // + Run the main application function to bring the user back to the main menu
    cli();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the name of the department you would like to add",
    })
    .then((answers) => {
      db.query(
        "INSERT INTO department(department_name) VALUES (?)",
        answers.department,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
          // + Run the main application function to bring the user back to the main menu
          cli();
        }
      );
    });
}

function addRole() {
      // + This queries the role, salary, and department for each role to be used later
  let sql1 =
    "SELECT role.title AS role, role.salary, department.department_name FROM role INNER JOIN department ON department.id = role.department_id;";
  
      // + This queries the department table to get a list of all departments to use as menu options in the inquirer list prompt of the addRole() menu, and is then used to find the ID of the selected department
    let sql2 = "SELECT department.department_name FROM department";

  db.query(sql1, (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.table(result);

    db.query(sql2, (err, result) => {
      if (err) {
        console.log(err);
      }
      let departmentList = result;

      let addRoleMenu = [
        {
          name: "newRole",
          type: "input",
          message: "What role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this new position?",
        },
        {
          name: "department",
          type: "list",
          message: "What department would you like to add this role to?",
          choices: function () {
            let depts = [];
            for (i = 0; i < departmentList.length; i++) {
              depts.push(departmentList[i].department_name);
            }
            return depts;
          },
        },
      ];

      inquirer.prompt(addRoleMenu).then((answers) => {
        let roleSql =
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";
        db.query(
          "SELECT department.id FROM department WHERE department_name = ?",
          answers.department,
          (err, result) => {
            console.log(result);
            const deptId = result[0].id;
            let sqlVars = [answers.newRole, parseInt(answers.salary), deptId];
            console.log(sqlVars);
            db.query(roleSql, sqlVars, (err, result) => {
              if (err) {
                console.log(err);
              }
              console.table(result);
              // + Run the main application function to bring the user back to the main menu
              cli();
            });
          }
        );
      });
    });
  });
}

function addEmployee() {
  // + Get list of roles to use as options for the new employee role
      let rolesSql = "SELECT title FROM role";
  // + Get list of managers to use as options for the new employee's manager
      let managerSql =         
      "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee.manager_id FROM employee JOIN role ON role.role_id = employee.role_id JOIN department ON role.department_id = department.id ORDER BY employee.employee_id;"

      db.query(rolesSql, (err, result)=>{
            if(err){
                  console.log(err);
            }
            let roles = result;

            db.query(managerSql, (err,result)=>{
                  if(err){
                        console.log(err);
                  }
                  // + For each manager in the list, create a new manager column with the first and last name of each manager. This will be used in the manager selection list in the inquirer prompt below.
                  for(i=0; i < result.length; i++) {
                        if(result[i].manager_id == 0){
                              result[i].manager = 'None';
                        }else{
                              result[i].manager = result[result[i].manager_id - 1].first_name + " " + result[result[i].manager_id - 1].last_name;
                        }
                        delete result[i].manager_id;
            }
            console.table(result);

            let managers = result;

            const empPrompts = [
                  {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the first name of the employee?'
                  },
                  {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the last name of the employee?'
                  },
                  {
                        type: 'list',
                        name: 'role',
                        message: 'What is the role of the new employee?',
                        choices: function(){
                              let roleList = [];

                              for(i=0; i < roles.length; i++){
                                    roleList.push(roles[i].title);
                              }
                              return roleList;
                        }
                  },
                  {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the manager of the new employee?',
                        choices: function(){
                              let managerList = [];
                              for(i=0; i < managers.length; i++){
                                    managerList.push(managers[i].first_name + " " + managers[i].last_name);
                              }
                              return managerList;
                        }
                  }
            ]

            inquirer.prompt(empPrompts)
            .then((answers) =>{
                  console.table(answers);
                  const manager = answers.manager.split(' ');
                  console.log(manager);
                  const managerFirstName = manager[0];
                  const managerLastName = manager[1];
                  // + Find the employee_id of the manager chosen from the manager list
                  db.query('SELECT employee_id FROM employee WHERE employee.first_name = ?', managerFirstName, (err, result) =>{
                        if(err){
                              console.log(err);
                        }
                        const managerId = result[0].employee_id;
                        db.query('SELECT role_id FROM role WHERE role.title = ?', answers.role, (err, result) =>{
                              const roleId = result[0].role_id;
                              console.log("ROLE ID:" + roleId);
                              const sqlVars = [answers.first_name, answers.last_name, managerId, roleId];
                              console.log(sqlVars);
                              db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', sqlVars, (err, result) => {
                                    console.table(result);
                        })
                        cli();
                  })
                  })
            })
      })
})

}

function updateEmployee() {}

cli();
