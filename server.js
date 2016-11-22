var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var usersOnline = 0;

io.on('connection', function (socket) {
    console.log('Client connected');
    
    usersOnline++;
    
    var nickname = '';
    socket.on('nickname', function(name) {
        nickname = name;
    });
    
    socket.on('message', function(message) {
        socket.emit('message', nickname + ': ' + message);
        socket.broadcast.emit('message', nickname + ': ' + message);
    });
    
    socket.on('disconnect', function () {
        usersOnline--;
        socket.broadcast.emit('notification', 'Another user disconnected.');
        socket.broadcast.emit('onlineUsers', usersOnline);
    });
    
    socket.broadcast.emit('notification', 'New user online.');
    socket.broadcast.emit('onlineUsers', usersOnline);
    
    // Sends the data to the client immediately.
    socket.emit('notification', 'New user online.');
    socket.emit('onlineUsers', usersOnline);
});

server.listen(process.env.PORT || 8080);
