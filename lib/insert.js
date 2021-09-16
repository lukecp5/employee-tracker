const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2");
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
	
function role() {
	// + This queries the role, salary, and department for each role to be used later
	let sql1 =
		"SELECT role.title AS role, role.salary, department.department_name FROM role INNER JOIN department ON department.id = role.department_id;";
	// + This queries the department table to get a list of all departments to use as menu options in the inquirer list prompt of the addRole() menu, and is then used to find the ID of the selected department
	let sql2 = "SELECT department.department_name FROM department";
	db.query(sql1, (err, result) => {
		if (err) {
			console.log(err);
		}
		db.query(sql2, (err, result) => {
			if (err) {
				console.log(err);
			}
			let departmentList = result;
			getDepartmentList = (departmentList) => {
				let depts = [];
				for (i = 0; i < departmentList.length; i++) {
					depts.push(departmentList[i].department_name);
				}
				return depts;
			};
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
					choices: getDepartmentList(departmentList),
				},
			];

			inquirer.prompt(addRoleMenu).then((answers) => {
				let roleSql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";

				function genRoleSql(deptId) {
					let sqlVars = [answers.newRole, parseInt(answers.salary), deptId];
					console.log(sqlVars);
					// + Run the INSERT query to add the new role to the employee.role table of the db
					db.query(roleSql, sqlVars, (err, result) => {
						if (err) {
							console.log(err);
						}
						// + Run the main application function to bring the user back to the main menu
						cli();
					});
				}
				db.query(
					"SELECT department.id FROM department WHERE department_name = ?",
					answers.department,
					(err, result) => {
						console.log(result);
						const deptId = result[0].id;
						genRoleSql(deptId);
					}
				);
			});
		});
	});
}; 

exports.role = role;