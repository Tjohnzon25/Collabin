const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render("welcome");
});

app.get('/login', (req, res) =>{
    res.render("loginPage");
});

app.get('/signup', (req, res) =>{
    res.render("signupPage");
});

console.log("running server!");

app.listen(3000);
