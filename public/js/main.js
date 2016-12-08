$(document).ready(function () {
    console.log('Text1');
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var chatForm = $('#chatForm');
    var message = $('#chatInput');
    var chatWindow = $('#chatWindow');
    var userForm = $('#userForm');
    var usename = $('#username');
    //console.log(usename.val());
    var users = $('#users');
    var error = $('#error');

    // Submit the user form
    userForm.submit(function (e) {
        console.log('TEST');
        e.preventDefault();
        var usernameValue = username.value;
        //console.log('Username: ' + usernameValue);
        socket.emit('set user', usernameValue, function (data) {
            if (data) {
                $('#userFormWrap').hide();
                $('#mainWrap').show();
            }
            else {
                error.html('Username is already taken');
            }
        });
    });

    chatForm.submit(function (e) {
        e.preventDefault();
        socket.emit('send message', message.val());
        message.val('');
    });

    socket.on('show message', function (data) {
        chatWindow.append(
            '<strong>' + data.user + '</strong>: ' +
                data.msg + '<br>'
        );
    });

    // Display Username
    socket.on('users', function (data) {
        console.log(data);
        var html = '';
        for (i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">' + data[i] + '</li>';
        }
        users.html(html);
    })
});