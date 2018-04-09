var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//

//use session

var session = require('express-session');

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// Build a chatroom
// 1) Have the NodeJS render views/index.ejs
    // a. This has the HTML content for the client whenever the client requests '/'

app.get('/', function (req, res) {
    res.render('chatroom', {data:"this is the piece of data that was passed!"});

});


var unique_user_id_counter;
var all_users = [];
var connected_users_obj = [];
var new_user_object = function (socket, name) {
    let user = {
        socket: socket,
        'name': name,
        'user_number':'na',
    };
};


function message(name, text){
    this.name = name;
    this.text = text;
}



var server = app.listen(8000, function () {
    console.log(`listening on 8000`);
    unique_user_id_counter = 0;
    console.log(`user id counter reset to: ${unique_user_id_counter} `);

});

//turn on the server via socket
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    // all_users.push(socket.id);
    console.log(connected_users_obj);
    connected_users_obj[socket.id] = {'name':''};
    console.log("connected users object:", connected_users_obj);

    // all_users.push(socket.id);
    all_users.push(new_user_object);
    console.log(`new all_users:`, all_users);

    console.log(`socket connected. id: ${socket.id} `);
    console.log(`user id from counter: ${unique_user_id_counter} `);
    unique_user_id_counter ++;

    socket.on('new_user_entered_chat', function (data) {
        console.log(`recieved new user:  ${data.name} `);
        connected_users_obj[socket.id].name = data.name;
        console.log(`connected users obj (+name):`, connected_users_obj);

        // console.log(`all users is now`, all_users);

    })

    socket.on('disconnect', function () {
        console.log(`got disconnect`);
        var i = connected_users_obj.indexOf(socket.id);
        console.log(`just tried to get index`,i);

        console.log(`connected users:`, connected_users_obj);

        // var i = all_users.indexOf(socket.id);
    //     console.log(`index of ${socket.id}:`, i);
    //     console.log(`proceed to splice!`);
    //     all_users.splice(i, 1);
    //     console.log(`after-disconnect all_users:`, all_users);
    // //    now that someone has left, each person needs to show they left
    //
    // // need to get the user_id associated with the disconnected socket
    //     console.log(`someone disconnected ${socket.id} `);
    //
    //

    })
//    listeners go in here
    socket.on('button_press', function () {
        current_button_count ++;
        console.log(`current button count: ${current_button_count} `);
        update_count_all(socket, current_button_count);
        console.log(`someone pressed the button! INCREASE FOR ALL!`);
    });

    socket.on('button_reset', function () {
        current_button_count = 0;
        console.log(`someone reset the count!`);
        update_count_all(socket, current_button_count);

    });

});

// 2) In the CLIENT code
    // a. JS code asks user for their name
        // i. Store the user name in a variable called "name"

// 3) Have the client EMIT information to the server
    // a. The EMIT event will be "new_user_entered_chatroom"
        // i. Pass "name" to the server

// 4) Server LISTEN for event called "new_user_entered_chatroom"
    // a. When it receives this event "new_user_entered_chatroom"
        // i. Store the name/session_id of the new user in a variable, array, or hash (hash) called users
        // ii. Emit to the NEW user
            // 1) Event called "existing_users"
                // a) Include all the users who are already in the chat
        // iii. BROADCAST to everyone
            // 1) Event called "new_user_joined"
                // a) Pass data "NAME" of new user

// 5) Have client side LISTEN for the event "existing_users"
    // a. This will be a one-time population of the existing users in the chat when the client connects

// 6) Have client side LISTEN for the event "new_user_joined"
    // a. When triggered
        // i. CLIENT should render the new user in jQuery in HTML
            // 1) Fade in box with new-user information

// 7) Have the SERVER listen for an event called 'disconnect'
    // a.  When detected, BROADCAST to all clients an event 'user_disconnected'
        // i. Send the id of the connected user
            // 1) Could use session ID
            // 2) Or something else to identify the user (why not a socket ID?)
//
// 8) Have the client listen for the event "user_disconnected"
    // a. When this gets triggered, client REMOVES the proper jQuery box
