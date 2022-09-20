const mysql = require("mysql");
const { promisify } = require("util"); // Sirve para poder usar promesas con la base de datos

const db_keys = require("./keys");

// Create mysql connection
const pool = mysql.createPool(db_keys);

pool.getConnection((err, connection) => {
    if (err) throw err;
    if (connection) connection.release();
    console.log("Database connected succesfully.");
    return;
});

pool.query = promisify(pool.query); // Para poder utilizar async / await con tu base de datos

module.exports = pool;