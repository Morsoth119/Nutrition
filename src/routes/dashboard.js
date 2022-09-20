const express = require("express");
const router = express.Router();

const pool = require("../database"); // Conexion con la DB

router.get("/", async (req, res) => {
    const meals = await pool.query("SELECT * FROM meals");
    res.render("dashboard/dashboard", {meals});
});

module.exports = router;