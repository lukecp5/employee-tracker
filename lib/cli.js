
// + Prompt using mainMenu from above
function cli(){
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
module.exports = cli;