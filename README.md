# CS-480-Semester-Project
CRUD App Using React, Node.JS, Express, MySQL


# Trevor Parchem CS480 Semester Project : Company Dashboard for Managers allowing them to view employees, view shifts, add/delete shifts for employees
The company dashboard is a full-stack CRUD app built using React, Node.JS, Express, MySQL.
  
## Getting Started  
  
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.  
  
### Prerequisites:  
  
What things you need to install the software and how to install them:  
* [Copy of Database](https://www.dropbox.com/s/ypo1j7t6g3js5ma/databaseSetup.sql?dl=0) - Copy of database & Schema
* [VS Code](https://code.visualstudio.com/) - Code Editor used in installation steps
* [MySql](https://www.mysql.com/) - Database Service
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench) - Database workbench 

Optionally: 
* [Postman](https://www.postman.com/) - Scalable API testing tool 
* [Copy of Postman Collection to test API requests](https://www.dropbox.com/s/87u7ymbui71dgg4/CS%20480%20Semester%20Project.postman_collection.json?dl=0) - Copy of Postman tests for the API
  
### Installing:  
  
A step by step series of examples that tell you how to get a development environment up and running  
  
1. Clone the repo from the following source into a designated folder on your local machine  
	```
	git clone https://github.com/tcparchem/CS-480-Semester-Project.git
	```

2. If you haven't already, download a copy of the database, open the .sql file in MySQL WorkBench and execute the file which will create the schema, tables, and procedures

3. In MySQL Workbench, connect to the database schema and execute the following query on it. MySQL 8.0+ by default does not support the authentication protocol requested by the server. In order to remedy this, follow the following instructions

Execute the following query in MYSQL Workbench:

``` ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' ```

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:

``` flush privileges; ```. 


4. Open VSCode and open top level folder of repository which contains a folder containing the backend and frontend code 

5. Navigate to the terminal and cd into .\backend\ and .\frontend\ folders respectively and run ``` npm install ``` in each of the directories to install the necessary dependencies
    

## Configuration:  
Navigate to /backend/server/database.js and change the appropriate paramteres & credentials in the mySqlConnection object based on your MySQL setup. Save the file with your changes
```
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employees',
  multipleStatements: true
});
```

## Running the Program:  
  
1. In the 'EXPLORER' tab of VS Code, in the bottom left there is a tab called NPM Scripts. Click on that dropdown and in the backend section, run the 'dev' command to start the backend server and API or you can cd into the backend folder and run 
	```
	 npx nodemon server/server.js -w server
	```  
    
2. Similarly, in the same NPM Scripts dropdown, in the frontend section, run the 'start' command to start the web application, which will launch localhost in your preferred browser. If a prompt appears that something is already running on port XXXX, run on a different port, enter 'Y' and hit enter to confirm. Another way is to cd into the frontend folder and run 
	```
	 react-scripts start
	```  
  
## Simulation & Results:
### Home Page:   
![](https://i.imgur.com/C6RTP2x.png)     

### Employee Directory:   
![](https://i.imgur.com/dpI0hBT.png)     

### All Shifts Page:   
![](https://i.imgur.com/xFPHcry.png)     

### Shifts This Week Page:   
![](https://i.imgur.com/ZOrk2at.png)     

### Shifts This Month Page:   
![](https://i.imgur.com/FAjdmP9.png)     

### Search By Name Page:   
![](https://i.imgur.com/bJURlXd.png)     

### Search By Time Page:   
![](https://i.imgur.com/XhX3jpJ.png)     

### Add Shift Page:   
![](https://i.imgur.com/Oma4lHo.png)  

### Remove Shift Page:   
![](https://i.imgur.com/D0c3f0j.png)    

      


## Deployed & Assembled with:  
* [React](https://reactjs.org/) - Javascript library for building user interfaces
* [React BootStrap](https://react-bootstrap.github.io/) - Front-end Framework
* [React Router](https://reactrouter.com/) - Declarative routing for React
* [Express](https://expressjs.com/) - Minimalist web framework for Node.JS, used for REST API & Server connections 
* [MySQL](https://www.mysql.com/) - Database Service 
* [MySQL Connector](https://www.npmjs.com/package/mysql) - Node.js driver for mysql. 
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js used to make API calls

# Design and Modeling Documentation:  
Database Schema:     

![](https://i.imgur.com/O6IsqHa.png)      


The database was created from scratch. I was unable to find a proper dataset that captured what I wanted to build in this application. There are two tables, employees and shifts. The diagram above describes the relationships between the attributes of each table. Upon implementing the database, I implored different constraints, such as 'NOT NULL' and AUTO_INCREMENT on the primary key fields. There is a foreign key relationship in the shifts table as employeeID references ID in the employees table. I also added a SQL constraint 'CheckEndlaterThanstart' which constrains when a manager adds a shift, the end date has to be after the start time, otherwise the constraint is violated and the insert will fail. 

After the tables were created, I made up mock data for a small to medium size company, around 40 employees, and populated the employees and shifts table with entries for the database to have an initial state. After that, I made use of SQL Procedures that would be called on the backend REST API side of things, I created the following procedures, used on the API side of the application: GetEmployees(), GetShifts() GetShiftsThisWeek(), GetShiftsThisMonth(), deleteShift(IN shiftID int), addShift(IN employeeID int, IN startTime datetime, IN endTime datetime, IN position varchar(25), IN location varchar(25)), retrieveShiftsByName(IN firstName varchar(255), IN lastName varchar(255)), and retrieveShiftsByTime(IN startTime datetime, IN endTime datetime).

After the database schema was created, I worked on the backend API to connect the database up to and setup the routes. Using express, I created corresponding HTTP function routes, (GET, POST, DELETE), and created the API which uses the MySQL NodeJS connector to query the database and return a JSON response. In order to test the API, I created a Postman collection and was able to run my API calls through there before developing the frontend

From the web application side, I built the UI using React and Bootstrap. My knowledge of web development is still very rudimentary, so this was the most challenging part of the project for me. Learning how React handles the DOM and how to render the JSON response and map that to HTML, using React Bootstrap components. Using React State to manage the observable properties of my components. I also had to learn how to use forms and how to retrieve data from the form and successfully use conditional rendering in react to display to the user if their query was successful or not through submission messages.       

# Challenges:
One of the challenges I ran into was mapping the results back from the MySQL connector to the react-bootstrap table and displaying it properly on the web page. Once I implemented the API, the challenge was handling the data and mapping it to its corresponding sections. I am not the most familiar with React/Bootstrap/Web applications and had to implement a mapping function that would allow me to take the JSON results back from the API and return the appropriate html tags associated with the data returned from the API.
       
Another challenge I ran into was the fact that the backend was separated from the frontend and running on its own separate port, which was causing issues with the API as it was trying to call the API from a different port so CORS (Cross-origin resource sharing) was throwing errors as CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. I was able to solve this by adding CORS into my backend and sending the appropriate header allowing it to make cross-origin requests.
       
Lastly, another challenge I ran into was finding a dataset for the project. I wasn't able to find any publicly available, sensitive information, stripped databases on employees and shifts that I could use to work with, so I decided to resolve this by coming up with my own database, schema, tables, and procedures.

### Conclusion:  
Overall, this was a fun project to work on and got dive into a lot of foreign technologies to me. It was fun imploring what SQL has to offer in terms of database constraints and features that helped enforce the data being entered and retrieved from the database. It was very helpful to build something full stack from the ground up and encounter different challenges throughout the process, both in the backend and the frontend. It was awesome to learn how to connect my backend API that connects to MySQL to retrieve results and send them to the frontend where they would be propagated.
