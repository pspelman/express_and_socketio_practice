// Import express and path modules.
var express = require( "express");
var path = require( "path");
// Create the express app.
var app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// Root route to render the index.ejs view.
app.get('/', function(req, res) {
    res.render('user_form');
    // res.render("index");
})


app.post('/', function (req, res) {
    console.log(`reached /result...user info submitted`);
    // console.log(req);

    // console.log(`req.body:`, req.body);
    // console.log(`whole req`, req);
    res.redirect('/');
    // res.render('success', {user_data: req.body});

});


//REPLACING THE app.listen with new code for using sockets
// Start Node server listening on port 8000.
// app.listen(8000, function() {
//     console.log("listening on port 8000");
// })


//this is the new code for using sockets
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

//Here's the code for controlling the sockets
io.sockets.on('connection', function (socket) {
    console.log("client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // var current_user = socket.id;
    if(!left) {
        var left = 0;
    }
    left += 20;

    function myFunc(arg) {
        console.log(`arg was => ${arg}`);
        var window_location = `yes,height=20,width=20,left=${left},scrollbars=yes,status=yes`;
        // socket.emit('executecommand', { commandName: 'log', location: window_location });
        socket.emit('executecommand', { commandName: 'signal', location: window_location });

        //TO OPEN A NEW THING FOR EVERYONE, UNCOMMENT LINE BELOW

        for (let i = 0; i< 20; i++){
            setTimeout(socket.broadcast.emit('executecommand', { commandName: 'signal', location: window_location }), 2000, 'funky');
        }
    }
    // for (let i = 0; i< 20; i++){
    //     setTimeout(myFunc, 1000, 'funky');

    // }

    socket.on("posting_form", function (data) {
        console.log(`the user form was posted! `);
        console.log(data);

        var jsonify_string = JSON.stringify(data.data);
        console.log(`stringified data: ${jsonify_string} `);

        let name =data.data.name;
        let location = data.data.location;
        let language = data.data.language;
        let message = data.data.message;

        var user_variables = ['name', 'location', "language", 'message'];

        var return_string = `name: ${data.data.name},`;



        //TRY to send submitted stuff to EVERYONE - could do a trip signup thing in "real-time"
        // socket.broadcast.emit('someone_submitted_stuff', {user_info: data.data});
        io.emit('someone_submitted_stuff', {user_info: data.data, id: socket.id});
        // socket.broadcast.emit('executecommand', { commandName: 'signal'});

    //    generate a random lucky number
        var lucky_number = Math.floor(Math.random()*9999+1);
        console.log(`lucky number ${lucky_number} `);

    //    now send back the emission to the person who submitted the form
        socket.emit('show_submission', {user_info: data.data, lucky_number: lucky_number});



    });


    // the rest of the server socket code goes in here
    socket.on("button_clicked", function (data) {
        console.log(`Someone clicked a button! Reason:` + data.reason);
        console.log(`user who clicked: ${socket.id} `);
        var instructions = {
            'do_something': function do_something() {
                console.log(`trying to do something`);
                window.open(document.URL,'_blank', 'location=yes,height=20,width=20,scrollbars=yes,status=yes');
            }
        };
        var instructions = function () {
                console.log(`trying to do something`);
                // window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
            };
        var window_location = "yes,height=570,width=520,scrollbars=yes,status=yes";
        // socket.emit('executecommand', { commandName: 'log', location: window_location });
        socket.emit('executecommand', { commandName: 'signal', location: window_location });
        socket.emit('instruction_set', {response_instructions: instructions});
        socket.emit('server_response', {response: "Sockets are the best!", instructions: instructions});


    });

    socket.on('pretty_box', function (data) {
        console.log(`someone added a pretty box! ${socket.id} `);
        socket.broadcast.emit('executecommand', { commandName: 'signal'});
    });




//    try making a timer



});

