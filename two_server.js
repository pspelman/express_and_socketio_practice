var express = require('express');
var form_app = express();
var socket = require('socket.io');

var bodyParser = require('body-parser');

form_app.use(bodyParser.urlencoded({extended: true}));

form_app.set('views', __dirname + '/views');
form_app.set('view engine', 'ejs');

form_app.use(express.static(__dirname + "/static"));

form_app.get('/', function (req, res) {
    res.render('index', {title: "Using Express"});
});

form_app.post('/users', function (req, res) {
    // code to add user goes here
    var body = req.body;
    console.log(`body was `, body);
  // at the end we want to redirect
    res.redirect('/');
});

//getting a specific user
form_app.get("/users/:id", function (req, res) {
    console.log(`The user id requested is ${req.params.id} `);

    res.send("You requested the user with id: " + req.params.id);
    //code to get the user from the db goes here
});

//start my server
form_app.listen(8000, function () {
    console.log(`Listening on 8000`);

});