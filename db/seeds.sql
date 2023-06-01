INSERT INTO department (name)
    VALUES ("Information Technology"),
    ("Human Resources"),
    ("Accounting");

INSERT INTO role (title, salary, department_id)
    VALUES ("User Support", 46000.00, 1),
    ("System Administrator", 78000.00, 1),
    ("IT Manager", 110000.00, 1),
    ("HR Manager", 110000.00 , 2),
    ("CPA", 120000.00, 3),
    ("Payroll", 58000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("Todd", "Howard", 3, NULL),
    ("Reid", "Madock", 2, 1),
    ("Hidetaka", "Miyazaki", 2, 1);
