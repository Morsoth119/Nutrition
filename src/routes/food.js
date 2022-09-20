const express = require("express");
const router = express.Router();

const pool = require("../database"); // Conexion con la DB

router.get("/", async (req, res) => {
    const foods = await pool.query("SELECT * FROM foods");
    res.render("food/food", {foods});
});

module.exports = router;