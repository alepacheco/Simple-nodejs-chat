var socket = io();
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})

function render (data) {

  var html = data.map(function(elem, index) {
    return(`<div class="animated slideInLeft">
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
  return false;
}

function addMessage(e) { 
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  if (message.author)
  socket.emit('new-message', message);
  return false;
}



