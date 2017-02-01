// Conectar al servidor
var socket = io();
// cuando reciva un envento (mensaje, title, ...) hacer lo que sea
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
});
socket.on('title', function(data) {
	$('#title').text(data);
})
socket.on('refresh', function() {
	return true;
})

// añadir un mesaje al dom
function render (data) {
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
  return false;
}

// Envia el mensaje al servidor, el mensaje de mustra 
// en la pantalla al recivirlo del servidor no directamente
function addMessage(e) { 
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  if (message.author == "" || message.text == "") {
  	alert("Write something");
  	return false;
  } 
  if (message.text == "delete") {
  	socket.emit('delete-all');
  	return true;
  }
  if (message.author == "title") {
  	socket.emit('change-title', message.text);
  	return false;
  }
  socket.emit('new-message', message);
  return false;
}



