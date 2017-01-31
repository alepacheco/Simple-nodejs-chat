var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var messages = [];
var buffer_lengt = 45;

app.use(express.static('public'));

io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado');
  if (messages.length > buffer_lengt) {
      socket.emit('messages', messages.slice(messages.length - buffer_lengt, messages.length));      
    } else {
      socket.emit('messages', messages);      
  }

  socket.on('new-message', function(data) {
    messages.push(data);
    console.log('message...');
    if (messages.length > buffer_lengt) {
      io.sockets.emit('messages', messages.slice(messages.length - buffer_lengt, messages.length));      
    } else {
      io.sockets.emit('messages', messages);      
    }
  });

  socket.on('delete-all', function (data) {
    messages = [];
  });
  socket.on('change-title', function (data) {
    io.sockets.emit('title', data.text);
  });
});

server.listen(process.env.PORT, function() {  
  console.log("Servidor en "+ process.env.PORT);
});