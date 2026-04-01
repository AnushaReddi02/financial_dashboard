const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const transactions = require("./data/transactions");

// Routes
app.get("/", (req, res) => {
    res.render("dashboard", { transactions });
});

app.get("/transactions", (req, res) => {
    res.render("transactions", { transactions });
});

app.get("/insights", (req, res) => {
    res.render("insights", { transactions });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});