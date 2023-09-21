const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Smile123',
  database: 'your_database',
});