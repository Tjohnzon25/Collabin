const express = require('express');
const Parse = require('parse/node');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

Parse.initialize("y216rteJNeE6eAaTT8xnfAJ54lThwulnpJSAjZy1", "Fmb5AmOs4JgZ5zQNSHEhRPjsMwlPhLqO52LPNZZp");

Parse.serverURL = 'http://parseapi.back4app.com/';

app.get('/', function (req, res) {
    res.render("welcome");
});

app.get('/login', (req, res) =>{
    res.render("loginPage");
});

app.get('/signup', (req, res) =>{
    res.render("signupPage");
});

app.get('/newUser', (req, res) =>{
  res.render("newUser");
});

// Request the Log in passing the email and password
app.post('/login', async(req, res) => {
  let infoUser = req.body;
    
  try{
    res.render('main', {infoUser: infoUser});
  } catch (error){
    res.render('loginPage');
  }
});

// Register the user passing the username, password and email
app.post('/signup', async(req, res) => {
  let infoUser = req.body;    
  let user = new Parse.User();

  user.set("username", infoUser.username);
  user.set("fullName", infoUser.fname);
  user.set("email", infoUser.email);
  user.set("password", infoUser.password);
  user.set("stageName", infoUser.stageName);
  user.set("whoType", infoUser.whoType);
  user.set("styleMusic", infoUser.styleMusic);
  user.set("goal", infoUser.goal);

  try{
    await user.signUp();
    res.render('main', {infoUser: infoUser});
  } catch (error) {
    res.render('signupPage');
      console.log(error);
  }
});

console.log("running server!");

app.listen(3000);
