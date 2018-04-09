// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app

var session = require('express-session');

var app = express();

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// app.use(session({secret: 'codingdojorocks'}));
var fs = require('fs');


var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));

app.set('view engine', 'ejs');
// setting up ejs and our views folder
app.set('views', __dirname + '/views');
// app.set('views', path.join(__dirname, './views'));
// root route to render the index.ejs view


app.get('index', function (req, res) {
    res.render('views/index.html', {count: req.session.counter});

});



app.get('/', function(req, res) {
    if (req.session.counter) {
        console.log(`adding one to session count`);
        req.session.counter++;
    } else {
        console.log(`initiating session count`);
        req.session.counter = 1;
    }
    res.render('index', {
        title: "my Express project",
    session: req.session});
    // res.redirect("index");
});

// post route for adding a user
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user to the database
    // Then redirect to the root route
    res.redirect('/');
})

app.post('/plus_two', function (req, res) {
    console.log(`the post route was pressed...add two!`);
    req.session.counter += 1;
    console.log(`adding one and redirecting to main to add 1 more (total of 2)`);

    res.redirect('/');

});
app.post('/reset', function (req, res) {
    console.log('resetting');
    req.session.counter = 0;
    res.redirect('/');

});
// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});