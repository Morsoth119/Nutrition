const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const crypt = require("../lib/bcrypt");

// SIGN IN

passport.use("local.signin", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await crypt.decrypt(password, user.password);
        if (validPassword) {
            console.log("User and password are correct");
            done(null, user);
        }
        else {
            console.log("Password is not correct");
            done(null, false);
        }
    }
    else {
        console.log("User not found");
        return done(null, false);
    }
}));

// SIGN UP

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