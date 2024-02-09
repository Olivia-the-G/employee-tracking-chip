const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log('Connected to employees_db.')
);

// Command line prompt
const question = [
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
];

const newDepartment = [
  {
    type: "input",
    name: "newDepartment",
    message: "Enter the name of the new department:"
  }
]

const newRole = [
  {
    type: "input",
    name: "newRole",
    message: "Enter the name of the new role:"
  }
]

const newEmployee = [
  {
    type: "input",
    name: "newEmployee",
    message: "Enter the name of the new employee:"
  }
]

// Recursive function to repeat the prompt
function promptUser() {
  inquirer.prompt(question).then((answers) => {
    switch (answers.selection) {
      case "View all departments":
        // Code to pull departments table from the database
        db.query('SELECT * FROM departments', function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(results);
          promptUser();
        });
        break;
      case "View all roles":
        db.query('SELECT * FROM roles', function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(results);
          promptUser();
        });
        break;
      case "View all employees":
        db.query('SELECT * FROM employees', function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(results);
          promptUser();
        })
        break;
      case "Add a department":
        inquirer.prompt(newDepartment).then((input) => {
          db.query(`INSERT INTO departments (name) VALUES (${input})`, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(results);
          })
          promptUser();
        })
        break;
      case "Add a role":
        inquirer.prompt(newRole).then((input) => {
          db.query(`INSERT INTO departments (name) VALUES (${input})`, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(results);
            promptUser();
          })
        })
        break;
      case "Add an employee":
        inquirer.prompt(newEmployee).then((input) => {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${input});`, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(results);
            promptUser();
          })
        })
        break;
      case "Update an employee role":
        // Code to update an employee's role in the database
        promptUser();
        break;
      case "Quit":
        console.log("Goodbye!");
        break;
    }
  });
}

// Initialize app
function init() {
  promptUser();
}

init();