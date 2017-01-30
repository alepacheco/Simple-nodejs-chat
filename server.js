var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var messages = [];
var buffer_lengt = 20;

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
});

server.listen(8080, function() {  
  console.log("Servidor en http://localhost:8080");
});