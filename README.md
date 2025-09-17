# reactmysql
 a project used to demonstrate ability to link React to a local PHP MyAdmin SQL database

How to get the project working

1. In your files, create a file called reactmysql (or wahtever you want) as the project directory
2. create a directory within that file called backend
3. copy files in the backend folder (here https://github.com/whitestjake/reactmysql/tree/main/backend)
4. Load your mysql server in XAMPP, create a new database (make sure to update the database name in backend)
5. copy and paste the SQL queries found in sql.txt (here https://github.com/whitestjake/reactmysql/blob/main/sql.text.txt)

pull from this repository (option 1, not recommended if not git familiar)
1. open your terminal or command prompt
2. ```git clone https://github.com/whitestjake/reactmysql```

  create your own directories (options 2)
1. ```cd backend```
2. ```npm init -y```
3. ```npm install express mysql cors nodemon```
4. modify your backend/package.json to say
```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```
5. ```cd backend``` and run ```npm start``` to start your backend server
6. now back in your primary director ```cd ..```, ```npm create vite@latest```, type frontend as project name and choose ```react``` and then ```javascript```
7. replace all the files with the same files found in frontend (here https://github.com/whitestjake/reactmysql/tree/main/Frontend)
8. cd frontend, run ```npm install``` and then run ```npm run dev``` at which point you can search ```http://localhost:5173/``` in any browser to access your react webpage
