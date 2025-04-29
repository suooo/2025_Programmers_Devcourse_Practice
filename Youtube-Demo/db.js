// Get the client
import mysql from "mysql2/promise";

// Create the connection to database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

// A simple SELECT query
const [results, fields] = await connection.query("SELECT * FROM `users`");
var { id, email, name, created_at } = results[0];
console.log(created_at);
