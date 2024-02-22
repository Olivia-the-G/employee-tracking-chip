require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db',
    port: '3306'
  },
  console.log('Connected to employees_db.')
);

// Bring up the initial prompt
function startUp() {
  // Prompt user for actions
  inquirer.prompt(
    [
      {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit"
        ]
      }
    ]
    // Recursive function to repeat the prompt
  ).then(answers => {
    switch (answers.selection) {
      case "View all departments":
        db.query("SELECT * FROM departments", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.table(data);
            startUp();
          }
        })
        break;
      case "View all roles":
        db.query("SELECT * FROM roles", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.table(data);
            startUp();
          }
        });
        break;
      case "View all employees":
        db.query("SELECT * FROM employees", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.table(data);
            startUp();
          }
        });
        break;
      case "Add a department":
        inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter the name of the new department:"
          }
        ]).then((answers) => {
          db.query(`INSERT INTO departments (name) VALUES ("${answers.name}")`, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("New department added");
              startUp();
            }
          });
        });
        break;
      case "Add a role":
        // get list of departments to use as choices
        db.query("SELECT * FROM departments", function (err, departments) {
          if (err) {
            console.log(err);
          }
          const deptOptions = departments.map(department => ({ name: department.name, value: department.ID }));

          inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the title of the new role:'
            },
            {
              type: 'list',
              name: 'department',
              message: 'Select the department for the new role:',
              choices: deptOptions
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the salary for the new role:'
            }
          ]).then((answers) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answers.title}", "${answers.salary}", "${answers.department}")`, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log("New role added");
                startUp();
              }
            });
          });
        });
        break;
      case "Add an employee":
        // get list of roles to use as choices
        db.query('SELECT * FROM roles', function (err, roles) {
          if (err) {
            console.log(err);
          }

          const roleOptions = roles.map(role => ({ name: role.title, value: role.ID }));

          db.query('SELECT * FROM employees', function (err, employees) {
            if (err) {
              console.log(err);
            }

            const managerOptions = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: `${employee.ID}`}));

            // add a "None" option to the manager list for instances of no manager
            managerOptions.unshift({ name: "None", value: null });

            inquirer.prompt([

              {
                type: 'input',
                name: 'first_name',
                message: "Enter the employee's first name:"
              },
              {
                type: 'input',
                name: 'last_name',
                message: "Enter the employee's last name:"
              },
              {
                type: 'list',
                name: 'role',
                message: 'Choose a role from the list',
                choices: roleOptions
              },
              {
                type: 'list',
                name: 'manager',
                message: "Choose the employee's manager",
                choices: managerOptions
              }
            ]).then((answers) => {
              db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.role}", "${answers.manager}")`, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("New employee added");
                  startUp();
                }
              });
            })
          })
        })
        break;
      // case "Update an employee role":
      case "Quit":
        console.log("Goodbye!");
        db.end();
        break;
      default:
        console.log("Not Available Yet.");
        startUp();
        break;
    }
  });
};

startUp();