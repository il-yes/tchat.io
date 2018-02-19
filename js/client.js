$(document).ready(function () {
  var socket = io.connect('http://localhost:8080');
	console.log("connection !!!"); 
	var messageField = $('#message');
	var msgtpl = $('#msgtpl');
	var panelMessages = $('#messages');
	var messageBox = $('.message');
	var lastMessage = false;
	msgtpl.remove()



	// ------------------------- Gestion des connexions ---------------------------
	// Connexion
	$('#login-form').on('submit', function(e){
		e.preventDefault();
		// Emission connexion
		socket.emit('login', {
			'mail' : $('#email').val(),
			'password' : $('#pwd').val()
		})

		// Reception confirmation connexion
		socket.on('logged', function(){
			$('.login-layer').fadeOut()
			messageField.focus()
		})
	})

	// Reception data
	socket.on('new_user', function(user){
		$('#users').append('<img src="'+ user.avatar +'" id="'+ user.id +'" class="thumbnail img-connected-user">');
	})

	// Reception deconnexion
	socket.on('disconnect_user', function(user){
		$('#'+ user.id).remove()
	})
	// ------------------------------------------------------------------------------



	// Emmission Post message
	$('#messages-form').on('submit', function(e){
		e.preventDefault();

		socket.emit('post_message', {'message' : messageField.val()})
		messageField.val(' ')
		messageField.focus()

	})


	
	// Reception Post message
	socket.on('post_message', function(message){
		var template = $('<div class="message">'+ Mustache.render(msgtpl.html(), message) +'</div>');
		if(lastMessage != message.user.id)
		{
			template.append('<div class="clearfix"></div>');
			lastMessage = message.user.id;
		}
		panelMessages.append(template)
		messageBox.animate({scrollTop : messageBox.prop('scrollHeight')}, 500);
	})	
});

