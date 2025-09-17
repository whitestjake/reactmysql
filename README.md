# reactmysql
 a project used to demonstrate ability to link React to a local PHP MyAdmin SQL database

How to get the project working

1. In your files, create a file called reactmysql (or whatever you want) as the project directory
2. Load your mysql server in XAMPP, create a new database (make sure to update the database name in backend)
3. copy and paste the SQL queries found in sql.txt into your database in the SQL window (here https://github.com/whitestjake/reactmysql/blob/main/sql.text.txt)

pull from this repository (option 1, not recommended if not git familiar)
1. open your terminal or command prompt
2. ```git clone https://github.com/whitestjake/reactmysql```

  create your own directories (options 2)
1.  create a directory within your main directory called backend
2.  3. copy files in the backend folder (here https://github.com/whitestjake/reactmysql/tree/main/backend)
3. ```cd backend```
4. ```npm init -y```
5. ```npm install express mysql cors nodemon```
6. modify your backend/package.json to say
```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```
7. ```cd backend``` and run ```npm start``` to start your backend server
8. now back in your primary director ```cd ..```, ```npm create vite@latest```, type frontend as project name and choose ```react``` and then ```javascript```
9. replace all the files with the same files found in frontend (here https://github.com/whitestjake/reactmysql/tree/main/Frontend)
10. cd frontend, run ```npm install``` and then run ```npm run dev``` at which point you can search ```http://localhost:5173/``` in any browser to access your react webpage
