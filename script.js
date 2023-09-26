const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Smile123',
  database: 'work',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
  startApp();
});
// the code above connects my code to mysql

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
// the code above prompts user to choose what they would like to see

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
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end(); // Close the database connection
          return;
      }

      startApp();
    });
}
// the code above allows the client to add and update the info on the tables

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
// the codes above allows clients to view tables they want to

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      connection.query('INSERT INTO department (name) VALUES (?)', [answer.departmentName], (err, results) => {
        if (err) {
          console.error('Error adding department:', err);
          return;
        }
        console.log('Department added successfully!');
        startApp(); // Return to the main menu
      });
    });
}


function addRole() {
  inquirer
    .prompt({
      type: 'input',
      name: 'Name',
      message: 'Enter the name of the role:',
    })
    .then((answer) => {
      connection.query('INSERT INTO role (name) VALUES (?)', [answer.roleName], (err, results) => {
        if (err) {
          console.error('Error adding role:', err);
          return;
        }
        console.log('Role added successfully!');
        startApp(); // Return to the main menu
      });
    });
}


function addEmployee() {
  inquirer
    .prompt({
      type: 'input',
      name: 'employeeName',
      message: 'Enter the name of the employee:',
    })
    .then((answer) => {
      connection.query('INSERT INTO employee (name) VALUES (?)', [answer.employeetName], (err, results) => {
        if (err) {
          console.error('Error adding employee:', err);
          return;
        }
        console.log('Employee added successfully!');
        startApp(); // Return to the main menu
      });
    });
}


function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee you want to update:',
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: 'Enter the ID of the new role for the employee:',
      },
    ])
    .then((answers) => {
      const employeeId = parseInt(answers.employeeId);
      const newRoleId = parseInt(answers.newRoleId);


      connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [newRoleId, employeeId],
        (err, result) => {
          if (err) {
            console.error('Error updating employee role:', err);
            return;
          }

          if (result.affectedRows === 0) {
            console.log('No employee found with that ID.');
          } else {
            console.log('Employee role updated successfully!');
          }

          // Return to the main menu
          startApp();
        }
      );
    });
}

// the codes above allow clients to add and update the data in the tables