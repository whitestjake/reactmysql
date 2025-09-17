# reactmysql
 a project used to demonstrate ability to link React to a local PHP MyAdmin SQL database

How to get the project working

1. In your files, create a file called reactmysql (or wahtever you want) as the project directory
2. create a directory within that file called backend
3. copy files in the backend folder (here https://github.com/whitestjake/reactmysql/tree/main/backend)
4. Load your mysql server in XAMPP, create a new database (make sure to update the database name in backend)
5. copy and paste the SQL queries found in sql.txt (here https://github.com/whitestjake/reactmysql/blob/main/sql.text.txt)
6. cd backend
7. npm init -y
8. npm install express mysql cors nodemon
9. modify your backend/package.json to say
```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```
10. ```cd backend``` and run ```npm start``` to start your backend server
11. now back in your primary director ```cd ..```, ```npm create vite@latest```, type frontend as project name and choose ```react``` and then ```javascript```
12. replace all the files with the same files found in frontend (here https://github.com/whitestjake/reactmysql/tree/main/Frontend)
13. cd frontend, run ```npm install``` and then run ```npm run dev``` at which point you can search ```http://localhost:5173/``` in any browser to access your react webpage
