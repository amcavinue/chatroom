$(document).ready(function() {
    var socket = io();
    var input = $('.current-message');
    var messages = $('#messages');
    var notifications = $('.notifications');
    var usersOnline = $('.num-online');
    var displayNickname = $('.nickname-display');
    var nicknameForm = $('#nickname-form');
    var nickname = '';

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    nicknameForm.submit(function(e) {
       e.preventDefault();
       nickname = $('#name').val();
       socket.emit('nickname', nickname);
       displayNickname.html(nickname);
       nicknameForm.hide();
    });

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
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
