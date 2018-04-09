var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('array_game');

});

var server = app.listen(8000, function () {
    console.log(`listening on port 8000`);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log(`socket connected. id: ${socket.id} `);

    socket.on('move_right', function (data) {
        console.log(` recieved request to move right. Current game board:`);
        console.log(data.board);
        let board = [0, 0, 2, 0, 1];
        io.emit('update_board', {board: board});
    });
    socket.on('move_left', function (data) {
        console.log(` recieved request to move right. Current game board:`);
        console.log(data.board);
        let board = [0, 0, 2, 1, 0];
        io.emit('update_board', {board: board});
    });

});