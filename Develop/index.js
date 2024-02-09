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
      "Update an employee role"
    ]
  }
];

// Initialize app
function init() {
  inquirer.prompt(question);
};

init();