var express = require('express');


//after installing session with npm install express-session
var session = require('express-session');

var app = express();

//this will make it so that every request has a request.session that is accessible
//using sessions is HIGHLY discouraged
app.use(session({secret: 'codingdojorocks'}));



//after installing body-parser with "npm install body-parser"
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//tell the app we're going to use ejs (the templating system for embedding js)
//need to have installed it with "npm install ejs"
app.set('views', __dirname + '/views');

//set the view engine itself so express knows we're using ejs (vs a different templating engine)
app.set('view engine', 'ejs');

//this line will tell the server to use the /static folder
app.use(express.static(__dirname + "/static"));


app.get('/user_form', function (req, res){
    res.render('index', {title: "my Express project"});
});

app.post('/users', function (req, res) {
    req.session.name = req.body.name;
    console.log(req.session.name);
    //code to add user to DB goes here
    //redirect back to root route
    res.redirect('/');
});

app.get('/', function(request, response) {
    console.log(`request object: ${request} `);
    response.send("<h1> YO YO YO!!!!</h1>")
    // response.send("Hello Express");
    // console.log(request);

    // console.log(`response object: ${response} `);


})

app.get("/users", function (request, response) {
    //hard-coded usr data

    var users_array = [
        {name: "mike", email: "michael@cd.com"},
        {name: "J", email: "j@phil.com"},
        {name: "B", email: "b@phil.com"},
        {name: "C", email: "c@phil.com"},
    ];

    response.render('users', {users: users_array});

})



app.post('/users', function (request, response){
    // code to add user to db goes here!
    console.log(`POST DATA:\n\n ${request.data} `);
    console.log(request.data);

    // redirect the user back to the root route.
    // All we do is specify the URL we want to go to:
    response.redirect('/');
})

//for processing a new user form
// app.get('/', function (request, response){
//     response.render('index', {title: "my Express project"});
// });
// route to process new user form data:
// app.post('/users', function (request, response){
//     //code to add user to db goes here!
// })
//
// app.get('/', function (request, response){
//     response.render('index', {title: "my Express project"});
// });
// route to process new user form data:



app.listen(8000, function() {
    console.log(`Listening on 8000`);

})