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
});

