$(document).ready(function () {
  var socket = io.connect('http://localhost:8080');
	console.log("connection !!!"); 

	$('#login-form').on('submit', function(e){
		e.preventDefault();
		// Emission
		socket.emit('login', {
			'mail' : $('#email').val(),
			'password' : $('#pwd').val()
		})
	})

	// Reception
	socket.on('new_user', function(user){
		$('#users').append('<img src="'+ user.avatar +'" id="'+ user.id +'">');
	})

	socket.on('disconnect_user', function(user){
		$('#'+ user.id).remove()
	})
});

