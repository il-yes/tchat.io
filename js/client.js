$(document).ready(function () {
  var socket = io.connect('http://localhost:8080');
	console.log("connection !!!"); 
	var messageField = $('#message');
	var msgtpl = $('#msgtpl');
	msgtpl.remove()


	$('#login-form').on('submit', function(e){
		e.preventDefault();
		// Emission
		socket.emit('login', {
			'mail' : $('#email').val(),
			'password' : $('#pwd').val()
		})

		socket.on('logged', function(){
			$('.login-layer').fadeOut()
			messageField.focus()
		})
	})



	// ------------------------- gestion des connexions ---------------------------
	// Reception
	socket.on('new_user', function(user){
		$('#users').append('<img src="'+ user.avatar +'" id="'+ user.id +'">');
	})

	socket.on('disconnect_user', function(user){
		$('#'+ user.id).remove()
	})



	$('#messages-form').on('submit', function(e){
		e.preventDefault();

		socket.emit('post_message', {'message' : messageField.val()})
		messageField.val(' ')
		messageField.focus()
	})


	socket.on('post_message', function(message){
		$('#messages').append('<div class="message">'+ Mustache.render(msgtpl.html(), message) +'</div>')
	})
});

