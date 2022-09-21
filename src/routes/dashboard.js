const express = require("express");
const router = express.Router();

const pool = require("../database"); // Conexion con la DB

router.get("/", async (req, res) => {
    const meals = await pool.query("SELECT * FROM meals");
    res.render("dashboard/dashboard", {meals});
});

router.get("/info", async (req, res) => {
    const data = await pool.query("SELECT a.id, f.name, f.kcal, f.carb, f.prot, f.fats, a.meal, a.quantity FROM user_food_meal a, users u, foods f, meals m WHERE a.user = u.id AND a.food = f.id AND a.meal = m.id AND u.id = 1;");
    res.send(data);
});

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM user_food_meal WHERE id = ?", [id]);
    res.redirect("/");
});

router.get("/add", async (req, res) => {
    res.render("/dashboard/add");
});
/*
router.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("INSERT INTO user_food_meal  VALUES (1, 1, 3, 1, 100);", [id]);
    res.redirect("/");
});*/

module.exports = router;