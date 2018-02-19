// Dependencies
const http = require('http');
const net = require('net');
const url = require('url');
const md5 = require('MD5')
const faker = require('faker');



// Create an HTTP 
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');

  console.log('Connection server ok !')
});
httpServer.listen(8080)



// Initialisation
const io = require('socket.io').listen(httpServer)
var users = {};
var messages = [];
var history = 2;


// Poit d'entrée
io.sockets.on('connection', function(socket){
	console.log('New connection')

	// assure l'historique lors de la connexion, des users connectés, des messages postés
	for(var k in users)
	{
		socket.emit('new_user', users[k])
	}
	for(var k in messages)
	{
		socket.emit('post_message', messages[k])
	}


	// ------------------- Login / Logout HANDLER ------------------------- //
	var me = false;

	//Reception connexion
	socket.on('login', function(user){
		console.log(user)
		me = user
		me.id = user.mail.replace('@', '-').replace('.', '-');
		me.avatar = faker.internet.avatar()
		me.username = faker.name.findName(); // Rowan Nikolaus
		users[me.id] = me

		io.sockets.emit('new_user', me) // emission connexion
		socket.emit('logged')			// emission confirmation connexion
	})

	// Reception deconnexion
	socket.on('disconnect', function(user){
		if(!me)
		{
			return false
		}
		delete users[me.id]
		io.sockets.emit('disconnect_user', me)	// emission deconnexion
	})
	// ---------------------------------------------------------------------- //


	// Reception Post message
	socket.on('post_message', function(message){
		message.user = me
		date = new Date()
		message.h = date.getHours()
		message.m = date.getMinutes()

		messages.push(message)
		if(messages.length > history)
		{
			messages.shift()
		}

		io.sockets.emit('post_message', message)	// emission post message

		
	})
})
















