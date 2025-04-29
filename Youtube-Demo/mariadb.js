// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

module.exports = connection;

// A simple SELECT query
// conn.query("SELECT * FROM `users`", (err, results, fields) => {
//   var { id, email, name, created_at } = results[0];
//   console.log(created_at);
// });
