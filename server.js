const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Class2023!',
        database: 'hr_db'
    },
    console.log(`Connected to the db`)
);

const viewAllDepts = async function() {
    const result = await db.promise().query('SELECT * FROM department');
    console.table(result[0]);
    init();
}

const viewAllRoles = async function() {
    const result = await db.promise().query('SELECT * FROM role');
    console.table(result[0]);
    init();
}

const viewAllEmployees = async function() {
    await db.promise().query('SELECT * FROM employee')
    .then((result) => { console.table(result[0]); })
    init();
}

const addDepartment = async function() {
    let qString = await inquirer.prompt([
    {
        type: 'input',
        name: 'dept',
        message: 'What department would you like to add?',
    },
    ])
    .then((answer) => {
        let { dept } = answer; 
        return `INSERT INTO department (name) VALUES (${mysql.escape(dept)});`;
    })
    await db.promise().query(qString)
    // .then((result) => { console.info(`Succesfully added new department to table.`); });
    init();
}

const addRole = async function() {
    let qString = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?',
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'Please provide the department ID of the department this role will belong too:',
        }
        ])
        .then((answers) => {
            let { title, salary, deptId } = answers; 
            return `INSERT INTO role (title, salary, department_id)
             VALUES (${mysql.escape(title)}, ${mysql.escape(parseInt(salary))}, ${mysql.escape(parseInt(deptId))});`;
    })
    await db.promise().query(qString)
    init();
}

const addEmployee = async function() {
    let qString = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'New employee first name:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'New employee last name:',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Please provide employees role ID:',
        },
        {
            type: 'input',
            name: 'mgrId',
            message: 'Please provide employees manager ID, leave blank if there is none:',
        },
        ])
        .then((answers) => {
            let { firstName, lastName, roleId, mgrId } = answers; 
            if (mgrId) {            
                return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (${mysql.escape(firstName)}, ${mysql.escape(lastName)}, ${mysql.escape(parseInt(roleId))}, ${mysql.escape(parseInt(mgrId))});`;
            } else {
                return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (${mysql.escape(firstName)}, ${mysql.escape(lastName)}, ${mysql.escape(parseInt(roleId))}, NULL);`;    
            }
    })
    await db.promise().query(qString)
    init();
}

const updateEmployeeRole = async function() {
    const employees = await db.promise().query('SELECT id, first_name, last_name, role_id FROM employee');
    console.info(employees[0]);
    let qString = await inquirer.prompt([
        {
            type: 'input',
            name: 'curEmployee',
            message: 'Enter the employee ID you would like to update:',
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter the ID of their new role:'
        }
        ])
        .then((answer) => {
            let { newRole, curEmployee } = answer; 
            return `UPDATE employee
            SET role_id = ${mysql.escape(parseInt(newRole))}
            WHERE ID = ${mysql.escape(parseInt(curEmployee))}`;
        })
    await db.promise().query(qString)
    // .then((result) => { console.info(`Succesfully added new department to table.`); });
    .then((result) => { console.table(result[0]); })
    init();
}
// Close the db
const exitApplication = async function() {
    await db.end()
}
/*
 If I am being honest this code feels very cursed to write,
 however I wanted to see if it's possible and JavaScript actually
 allows it, and storing it like this creates a situation where my
 conditional is at the same index as the function it needs to fire
 which made for neat looking code honestly.
*/
const optionsArr = [
    ['View all departments', viewAllDepts ],
    ['View all roles', viewAllRoles ],
    ['View all employees', viewAllEmployees ],
    ['Add a department', addDepartment ],
    ['Add a role', addRole ],
    ['Add an employee', addEmployee ],
    ['Update an employee\'s role', updateEmployeeRole ],
    ['Exit application', exitApplication ],
];

function init() {
    return inquirer
    .prompt([{
        type: 'list',
        name: 'actions',
        message: 'What would you like to do?',
        choices: options = optionsArr.map(x => x[0]),
        },
    ])
    .then((answer) => {
        let { actions } = answer;
        let exit = optionsArr[optionsArr.length - 1][0];

        if (actions === exit) {
            return exitApplication();
        };
        // Condition is stored in [0], function is stored in [1]
        optionsArr.forEach(option => {
            if (option[0] === actions) {
                option[1]();
            }
        });
    })
    
}

init();