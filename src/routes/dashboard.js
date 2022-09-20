const express = require("express");
const router = express.Router();

const pool = require("../database"); // Conexion con la DB

router.get("/", async (req, res) => {
    const meals = await pool.query("SELECT * FROM meals");
    res.render("dashboard/dashboard", {meals});
});

router.get("/test", async (req, res) => {
    const data = await pool.query("SELECT a.id, f.name, f.kcal, f.carb, f.prot, f.fats, a.meal, a.quantity FROM user_food_meal a, users u, foods f, meals m WHERE a.user = u.id AND a.food = f.id AND a.meal = m.id AND u.id = 1;");
    res.send(data);
});

module.exports = router;