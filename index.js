// Build a command-line application that at a minimum allows the user to:
const fs = require('fs');
const inquirer = require('inquirer');
const server = require('./server')

const showMenu = (answers) => {
  inquirer.prompt(
{
    type: 'list', 
    name: 'todo',
    message: 'What would you like to do?',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Roles', 'View Employees', 'Update Employee Roles', 'Exit'],
}
).then((--------------------------) => {
    switch(-----------) {
// if add department is chosen
    case(-----------):
     addDepartment();
     break;
// if add role is chosen
    case(--------):
     addRoles();
     break;
// if add employee is chosen
    case(-------------):
     addEmployees();
     break;
// if view department is chosen
    case(-----------):
     viewDepartment();
     break;
// if view roles is chosen
    case(-------------):
     viewRoles();
     break;
// if view employess is chosen
    case(------------):
     viewEmployees();
     break;
// if update employee roles is chosen
    case(-------------):
     updateEmployee();
     break;
// if  is chosen
    default:
      ------------();
    }
})}; 


// Add departments, roles, employees
const addDepartment = () => {

};

const addRoles = () => {

};

const addEmployees = () => {

};

// View departments, roles, employees
const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
}};

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
}};

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
}};

// Update employee roles
const updateEmployee = () => {

};