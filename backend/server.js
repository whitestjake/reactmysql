const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dse6100_assignment3",
  port: 3306,
  multipleStatements: true
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Root route localhost:8081/
app.get('/', (req, res) => {
  res.json("Welcome to the DB class.");
});

// when the browser points to localhost:8081/listall
app.get('/listall', (request, response) => {
    const stmt = "SELECT * FROM students"
    db.query(stmt, (err, data) => {
        if(err) return response.json(err)
        else return response.json(data)
    })
});

// Whitelist of tables
const allowedTables = {
  '2025mostplayedchamps': "`2025mostplayedchamps`",
  advancedanalyticscourseoptions: "`advancedanalyticscourseoptions`",
  coolcars: "`coolcars`",
  leaguechampions: "`leaguechampions`",
  myrestaurants: "`myrestaurants`",
  stickshifts: "`stickshifts`",
  storeprices: "`storeprices`",
  students: "`students`",
  traveled: "`traveled`",
  wifesrestaurants: "`wifesrestaurants`",
  wishlist: "`wishlist`"
};

// The 10 SELECT statements
const extraQueries = {
  matchingCars: `
    SELECT c.Make, s.Model
    FROM StickShifts s
    JOIN CoolCars c ON s.Make = c.Make AND s.Model = c.Model
    WHERE s.Year = 2025 AND c.Make IN ('Toyota','BMW');
  `,
  wishlistPrices: `
    SELECT w.Brand, w.Product, s.Price
    FROM Wishlist w
    JOIN StorePrices s ON w.Brand = s.Brand AND w.Product = s.Product;
  `,
  wishlistSamsung: `
    SELECT w.Brand, w.Product, s.Price
    FROM Wishlist w
    JOIN StorePrices s ON w.Brand = s.Brand AND w.Product = s.Product
    WHERE w.Brand = 'Samsung' AND s.Price > 400;
  `,
  champsBotWins: `
    SELECT m.Name, m.Wins, l.PrimaryRole
    FROM \`2025mostplayedchamps\` m
    JOIN LeagueChampions l ON m.Name = l.Name
    WHERE m.Wins > 50 AND l.PrimaryRole = 'Bot';
  `,
  highDamageKBBQ: `
    SELECT w.Name, w.City, m.Type
    FROM WifesRestaurants w
    JOIN MyRestaurants m ON w.Name = m.Name
    WHERE w.Damage = 'High' AND m.Type = 'KBBQ HotPot';
  `,
  carsToyotaBMW: `
    SELECT s.Make, s.Model
    FROM StickShifts s
    JOIN CoolCars c ON s.Make = c.Make AND s.Model = c.Model
    WHERE s.Year = 2025 AND c.Make IN ('Toyota','BMW');
  `,
  jungleChampWins: `
    SELECT l.Name, l.PrimaryRole, m.Wins
    FROM LeagueChampions l
    JOIN \`2025mostplayedchamps\` m ON l.Name = m.Name
    WHERE l.PrimaryRole = 'Jungle' AND m.Wins >= 10;
  `,
  royalOakRestaurants: `
    SELECT w.Name, w.City, m.Type
    FROM WifesRestaurants w
    JOIN MyRestaurants m ON w.Name = m.Name
    WHERE w.City = 'Royal Oak' AND w.Damage = 'Medium';
  `,
  hyundaiCars: `
    SELECT c.Make, c.Model, s.Year
    FROM CoolCars c
    JOIN StickShifts s ON c.Make = s.Make AND c.Model = s.Model
    WHERE c.Make = 'Hyundai' AND s.Year = 2025;
  `,
  traveledVacations: `
    SELECT t.City, w.Name
    FROM Traveled t
    JOIN WifesRestaurants w ON t.City = w.City
    WHERE t.Reason = 'Vacation' AND t.City = w.City;
  `
};

// Fetch all tables at once
app.get('/all-tables', (req, res) => {
  // Build a list of SELECT queries
  const queries = Object.values(allowedTables).map(table => `SELECT * FROM ${table};`);
  const sql = queries.join(' ');

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const response = {};
    let i = 0;
    for (let key in allowedTables) {
      response[key] = results[i++];
    }
    return res.json(response);
  });
});

// Endpoint to create tables if they don't exist
app.get('/create-tables', (req, res) => {
  let completed = 0;
  let errors = [];

  Object.entries(extraQueries).forEach(([key, selectQuery]) => {
    const tableName = key.toLowerCase();
    const sql = `DROP TABLE IF EXISTS ${tableName}; CREATE TABLE ${tableName} AS ${selectQuery}`;

    db.query(sql, (err) => {
      completed++;
      if (err) errors.push({ table: tableName, error: err });

      if (completed === Object.keys(extraQueries).length) {
        if (errors.length > 0) res.status(500).json(errors);
        else res.json({ message: 'All tables created successfully!' });
      }
    });
  });
});

// Endpoint to fetch any created table
app.get('/table/:name', (req, res) => {
  const table = req.params.name.toLowerCase();
  db.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(8081, () => {
  console.log('Server running on port 8081');
});

// Fetch single student by ID (parameterized query)
app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, [studentId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Student not found" });
    return res.json(data[0]);
  });
});

// Start server
app.listen(8081, () => console.log("Server running on port 8081"));