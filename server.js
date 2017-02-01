// Dependencias
var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

// Variables locales
var messages = [];
var buffer_lengt = 25;
var title = "Bienvenido a Chat TIC";

// Serve public folder
app.use(express.static('public'));

// Handle connections
io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado');
  socket.emit('title', title);

  // enviar los mensajes (solo los N ultimos)
  if (messages.length > buffer_lengt) {
      socket.emit('messages', messages.slice(messages.length - buffer_lengt, messages.length));      
    } else {
      socket.emit('messages', messages);      
  }
  // Cuando el cliente nos da un mensaje 
  socket.on('new-message', function(data) {
    messages.push(data);
    console.log('message...');
    if (messages.length > buffer_lengt) {
      io.sockets.emit('messages', messages.slice(messages.length - buffer_lengt, messages.length));      
    } else {
      io.sockets.emit('messages', messages);      
    }
  });

  // Para borrar (inicializar) mensajes
  socket.on('delete-all', function (data) {
    messages = [];
    io.sockets.emit('refresh');
  });

  // Pues para cambiar title
  socket.on('change-title', function (data) {
    io.sockets.emit('title', data);
    title = data;
    io.sockets.emit('refresh');
  });
});

// Start server bla bla bla
server.listen(process.env.PORT, function() {  
  console.log("Servidor en "+ process.env.PORT);
});