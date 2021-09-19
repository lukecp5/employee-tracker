# **Employee Tracker**
![license MIT](https://img.shields.io/badge/license-MIT-blue.svg)

 Employee Tracker is a CLI application built from scratch that allows anyone to easily create and manage an employee database. This application is built with Node.js, MySQL, Inquirer, and various node modules listed in the 'Built With' section below. 

![https://drive.google.com/file/d/1Pxs6RoaEuJPxKlnvm1Gn7UMXh2idTSJp/view](https://github.com/lukecp5/employee-tracker/blob/58255f981bba01fc42bb18c41b7b459f185de19a/Assets/emp-tracker-gif.gif?raw=true) 

---

> This Node.js application connects to a local MySQL employee database using the _mysql2_ package, and allows you to add departments, roles, and employees. When adding employees, roles, or departments, you will be prompted for various information about the respective entry. It then allows you to view and interact with the data using a dynamic menu. You can view all departments, roles, and employees, and even update the information of a specific entry.

---

## **Table of contents**

- [Employee Tracker](#employee-tracker)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Built With](#built-with)
  - [License](#license)
---
## **Installation**

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/lukecp5/employee-tracker.git
$ cd employee-tracker
```

To install and set up the application, run:

```sh
$ npm install employee-tracker
```

---

## **Usage**
To start Employee Tracker, run:
```sh
node index.js
```

A menu will appear that contains all of the functionality to interact with the employee database. From here, you can start adding your departments, roles, and employees. Once you've got your information entered, you can view the data in a convienent table layout with all of the columns that correspond to the chosen database table.

Employee Tracker allows you to add an employees full name, role/title, and manager. It then inserts the employee into the department that the selected manager is assigned to. When adding a role, you will be prompted for the title, salary, and will select the appropriate department from a list. For adding a department, you simply enter the name of the department.

---

## **Built With**
* [**MySQL**](https://www.mysql.com/) 
* [**Node.js**](https://nodejs.org/en/about/)
*  - [mysql2](https://www.npmjs.com/package/mysql2) - Database implementation 
*  - [Inquirer](https://www.npmjs.com/package/inquirer) - CLI input processing and validation
*  - [console.table](https://www.npmjs.com/package/console.table) - Utility for displaying data in table format inside the console
* [**Visual Studio Code**](https://code.visualstudio.com/)

---

## **Demonstration Video**
If you'd like to see a full demo of the application, please visit the following link: [Video on Google Drive](https://drive.google.com/file/d/1NqhU8W-d0f6aTS-0DcA6_MjpmYvijm3-/view?usp=sharing)

---

## **Contributing**

---

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

---

## **Author**
**Luke Poirrier**   
LinkedIn: [@luke-poirrier](https://www.linkedin.com/in/luke-poirrier)  
Email: [Luke@LukePoirrier.com](mailto:Luke@LukePoirrier.com)  
Portfolio: [LukePoirrier.com](http://lukepoirrier.com)  

---

## **License**
This application is licensed under the MIT License, you can find the full license information [here](http://github.com/lukecp5/employee-tracker/LICENSE.txt)

---


