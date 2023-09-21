const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Smile123',
  database: 'your_database',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
  startApp();
});

function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
     .then((choice) => {
      switch (choice.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          // Implement code to add a department
          break;
        case 'Add a role':
          // Implement code to add a role
          break;
        case 'Add an employee':
          // Implement code to add an employee
          break;
        case 'Update an employee role':
          // Implement code to update an employee's role
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end(); // Close the database connection
          return;
      }

      startApp();
    });
}


function viewDepartments() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return;
    }

    console.log('\nAll Departments:\n');
    console.table(results);

    // Return to the main menu
    startApp();
  });
}

function viewRoles() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return;
    }

    console.log('\nAll Role:\n');
    console.table(results);

    // Return to the main menu
    startApp();
  });
}

function viewEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return;
    }

    console.log('\nAll Departments:\n');
    console.table(results);

    // Return to the main menu
    startApp();
  });
}

