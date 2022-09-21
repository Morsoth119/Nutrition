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

router.get("/add/:id", async (req, res) => {
    const { id } = req.params;
    const meal = await pool.query("SELECT * FROM meals WHERE id = ?", [id]);
    const foods = await pool.query("SELECT * FROM foods");
    res.render("dashboard/add", {meal, foods});
});

router.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    const newItem = {
        user: 1,
        food: id2,
        meal: id1
    };
    console.log(newItem);
    //await pool.query("INSERT INTO user_food_meal  VALUES (?);", [newItem]);
    res.redirect("/");
});

router.get("/adda", (req, res) => {
    res.send(req.params);
});

module.exports = router;