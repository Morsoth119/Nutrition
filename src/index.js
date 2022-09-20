const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 8000);

app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", hbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
})); // Configuracion de hbs
app.set("view engine", ".hbs"); // Para usar  hbs como motor de plantillas html

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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