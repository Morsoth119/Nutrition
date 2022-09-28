const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
// const validator = require("express-validator");
// const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
// const { db_keys } = require("./keys");

require("./lib/passport");

const app = express();
app.set("port", process.env.PORT || 8000);

app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", hbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
})); // Configuracion de hbs
app.set("view engine", ".hbs"); // Para usar hbs como motor de plantillas html

// Global Variables
app.use((req, res, next) => {
    app.locals.user = req.user;
    console.log(req.user);
    next();
});

// Middlewares
app.use(session({
    secret: "nutritionMySqlSession",
    resave: false,
    saveUninitialized: false
    // store: new MySQLStore(db_keys)
}));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes"));
app.use(require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/food", require("./routes/food"));

// 
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(app.get("port"), () => {
    console.log("Server online on port:", app.get("port"));
});