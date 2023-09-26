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

    console.log('\nAll Roles:\n');
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

    console.log('\nAll Employees:\n');
    console.table(results);

    // Return to the main menu
    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      if (!answer.departmentName) {
        console.log('Please enter a valid department name.');
        startApp(); // Return to the main menu
        return;
      }

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
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      if (!answer.title || !answer.salary || !answer.department_id) {
        console.log('Please enter valid values for title, salary, and department ID.');
        startApp(); // Return to the main menu
        return;
      }

      connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.title, answer.salary, answer.department_id],
        (err, results) => {
          if (err) {
            console.error('Error adding role:', err);
            return;
          }
          console.log('Role added successfully!');
          startApp(); // Return to the main menu
        }
      );
    });
}


function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID of the employee:',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID of the employee (optional):',
      },
    ])
    .then((answer) => {
      if (!answer.first_name || !answer.last_name || !answer.role_id) {
        console.log('Please enter valid values for first name, last name, and role ID.');
        startApp(); // Return to the main menu
        return;
      }

      // If manager_id is not provided, set it to NULL
      const managerId = answer.manager_id || null;

      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.first_name, answer.last_name, answer.role_id, managerId],
        (err, results) => {
          if (err) {
            console.error('Error adding employee:', err);
            return;
          }
          console.log('Employee added successfully!');
          startApp(); // Return to the main menu
        }
      );
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
