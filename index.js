// Build a command-line application that at a minimum allows the user to:
const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "",
  // Your password
  password: "",
  database: "employee_tracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  showMenu();
});

const showMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "todo",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Roles",
        "View Employees",
        "Update Employee Roles",
        "Exit",
      ],
    })
    .then((response) => {
      switch (response.todo) {
        // if add department is chosen
        case "Add Department":
          addDepartment();
          break;
        // if add role is chosen
        case "Add Role":
          addRoles();
          break;
        // if add employee is chosen
        case "Add Employee":
          addEmployees();
          break;
        // if view department is chosen
        case "View Department":
          viewDepartment();
          break;
        // if view roles is chosen
        case "View Roles":
          viewRoles();
          break;
        // if view employess is chosen
        case "View Employees":
          viewEmployees();
          break;
        // if update employee roles is chosen
        case "Update Employee Roles":
          updateEmployee();
          break;
        // if exit is chosen
        default:
          console.log("Exiting Program");
          process.exit();
      }
    });
};

// Add departments, roles, employees
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What is the name of your department?",
    })
    .then((response) => {
      connection.query(
        `INSERT INTO department (department_name) VALUES ('${response.departmentName}')`,
        (err) => {
          if (err) throw err;
          viewDepartment();
          showMenu();
        }
      );
    });
};

const addRoles = () => {
  inquirer
    .prompt(
      {
        type: "input",
        name: "titleName",
        message: "What is the title of this role?",
      },
      {
        type: "input",
        name: "salaryAmount",
        message: "What is the salary of this role?",
      }
    )
    .then((response) => {
      connection.query(
        `INSERT INTO role (title, salary) VALUES ('${response.titleName}', '${response.salaryAmount}')`,
        (err) => {
          if (err) throw err;
          viewRoles();
          showMenu();
        }
      );
    });
};

const addEmployees = () => {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results); 
  inquirer
    .prompt(
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the first name of your employee?"
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the last name of your employee?"
      },
      {
        type: "input",
        name: "roleID",
        message:
          "From the table above, what is the ID of the role of your employee?"
      }
    )
    .then((response) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${response.employeefirstName}', '${response.employeelastName}', '${response.roleID}')`,
        (err) => {
          if (err) throw err;
          viewEmployees();
        }
      );
    });
})
};

// View departments, roles, employees
const viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    showMenu();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    showMenu();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    showMenu();
  });
};

// Update employee roles
const updateEmployee = () => {
  connection.query("SELECT * FROM EMPLOYEE", (err, results) => {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt({
        type: "number",
        name: "employeeId",
        message: "What is the ID of the employee you would like to update?",
      })
      .then((response) => {
        // show available roles
        connection.query("SELECT * FROM role", (err, res) => {
          if (err) throw err;
          console.table(res);
          inquirer
            .prompt(
              // Ask which role ID to use
              {
                type: "number",
                name: "roleId",
                message: "What is the ID of the role you would like to use?",
              }
            )
            .then((answer) => {
              connection.query(`UPDATE employee SET role_id = ${answer.roleId} WHERE id = ${response.employeeId}`, (err, res) => {
                if (err) throw err;
                console.table(res);
                showMenu();
            });
        });
      });
  });
})};
