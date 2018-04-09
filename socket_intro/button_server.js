var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//default path shows push_button.ejs
app.get('/', function (req, res) {

    res.render('push_button');
});

//set the server
var server = app.listen(8000, function () {
    console.log(`listening on 8000`);
});

//turn on the server via socket
var io = require('socket.io').listen(server);

var current_button_count = 0;


var update_count = function (socket, current_button_count) {
    console.log(`running update_count function`);
    socket.emit('update_count', {count:current_button_count});
};

var update_count_all = function (socket, current_button_count) {
    console.log(`running update_count FOR ALL`);
    io.emit('update_count', {count:current_button_count});
};

io.sockets.on('connection', function (socket) {
    console.log(`socket connected. id: ${socket.id} `);
    update_count(socket, current_button_count);



    // socket.emit('update_count', {count:current_button_count});
//    emit the current count when they connect

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

