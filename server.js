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

const options = [
    'Exit application',
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee\'s role'
];

function init() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'actions',
            loop: 'false',
            message: 'What would you like to do?',
            choices: [
                options[1],
                options[2],
                options[3],
                options[4],
                options[5],
                options[6],
                options[7],
                options[0],
            ],
            validate(val) {
                if(val === options[0]) {
                    console.info('exiting application...')
                }
            }
        },
    ])
    .then((answer) => {
        console.info(answer);
    });
    console.info('Am I fucking stuck here?');
}

async function testQuery() {
    const result = await db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.info(err);
        } else {
            console.info(results);
            return results;
        }
    });
    return result;
}

init();