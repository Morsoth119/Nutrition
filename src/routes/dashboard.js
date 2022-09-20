const express = require("express");
const router = express.Router();

const pool = require("../database"); // Conexion con la DB

router.get("/", (req, res) => {
    res.render("dashboard/dashboard");
});

module.exports = router;