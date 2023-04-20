const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hr_db'
    },
    console.log(`Connected to the db`)
);

const viewAllDepts = async function() {
    const result = await db.promise().query('SELECT * FROM department');
    console.table(result[0]);
    hrApp();
}

const viewAllRoles = async function() {
    const result = await db.promise().query('SELECT * FROM role');
    console.table(result[0]);
    hrApp();
}

const viewAllEmployees = async function() {
    await db.promise().query('SELECT * FROM employee')
    .then((result) => {
        console.table(result[0]);
    })
    hrApp();
}

const addDepartment = function() {
    return queryResult;
}

const addRole = function() {
    return 'Added role';
}

const addEmployee = function() {
    return 'Added Employee';
}

const updateEmployee = function() {
    return 'Updated Employee';
}

const exitApplication = function() {
    return 'Exiting application'
}

const optionsArr = [
    ['View all departments', viewAllDepts ],
    ['View all roles', viewAllRoles ],
    ['View all employees', viewAllEmployees ],
    ['Add a department', addDepartment ],
    ['Add a role', addRole ],
    ['Add an employee', addEmployee ],
    ['Update an employee\'s role', updateEmployee ],
    ['Exit application', exitApplication ],
];

function hrApp() {
    // if (queuedFunction) {
    //     queuedFunction();
    // }

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
        // return actions;
        optionsArr.forEach(element => {
            if (element[0] === actions) {
                // return hrApp(element[1]);
                element[1]();
            }
        });
    })
    // .then((action) => {
    //     // let { actions } = answer;
    //     console.info(action);
    //     optionsArr.forEach(element => {
    //         if (element[0] === action) {
    //             return hrApp(element[1]);
    //         }
    //     });
    // })
    
}

function init() {
    hrApp();
    // db.close();
}

init();