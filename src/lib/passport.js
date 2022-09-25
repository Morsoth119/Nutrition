const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const crypt = require("../lib/bcrypt");

passport.use("local.signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        fullname,
        password
    }
    newUser.password = await crypt.encrypt(password);
    const res = await pool.query("INSERT INTO users SET ?", [newUser]);
    newUser.id = res.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    done(null, rows[0]);
});