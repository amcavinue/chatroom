$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var notifications = $('.notifications');
    var usersOnline = $('.num-online');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    
    socket.on('onlineUsers', function(numUsers) {
        usersOnline.empty().html(numUsers);
    });
    
    socket.on('message', addMessage);
    
    socket.on('notification', function(notification) {
        notifications.empty().html(notification);
        notifications.show().delay(3000).fadeOut();
    });
});
