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
  // Remove animated class of previous messages
  $('.animated div:not(:last-child').removeClass('animated')
  return false;
}

function addMessage(e) { 
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  if (message.author == "" || message.text == "") {
  	alert("Write something");
  	return false;
  }
  socket.emit('new-message', message);
  return false;
}



