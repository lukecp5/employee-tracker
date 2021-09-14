USE employee_db;

INSERT INTO department (department_name) 
VALUES ('Sales'),
       ('Marketing'),
       ('Customer Service'),
       ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Representative', 65000, 1),
       ('Lead Sales Manager', 95000, 1), 
       ('Sales Intern', 45000, 1),

       ('Lead Marketing Manager', 110000, 2),
       ('Social Media Marketing Agent', 65000, 2),
       ('Marketing Agent', 70000, 2),
       ('Marketing Intern', 45000, 2),

       ('Customer Service Manager', 110000, 3),
       ('Customer Service Representative', 70000, 3),
       ('Customer Service Intern', 50000, 3),

       ('Lead Developer', 135000, 4),
       ('Software Engineer', 110000, 4),
       ('Senior Developer', 110000, 4),
       ('Jr. Software Engineer', 75000, 4),
       ('Software Engineering Intern', 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 2, 0),
       ('Mary', 'Smith', 1, 1),
       ('Jason', 'Bourne', 3, 1),
       ('Tom', 'Zuckerburg', 3, 1),

       ('Mark', 'Manahan', 4, 0),
       ('Andy', 'Munez', 5, 5),
       ('Moana', 'Jones', 7, 5),
       ('Gerald', 'Babas', 6, 5),
       ('Margie', 'Thompson', 6, 5),

       ('Jack', 'Bower', 8, 0),
       ('Jenny', 'Swanson', 10, 10),
       ('Zachary', 'Yodel', 9, 10),
       ('Yolanda', 'Hanniburger', 9, 10),

       ('Justen', 'McLean', 11, 0),
       ('Luke', 'Poirrier', 12, 14),
       ('Wade', 'Nations', 13, 14),
       ('Brandi', 'Bollinger', 14, 14),
       ('Charvis', 'Ray', 15, 14);