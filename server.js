const http = require('http');
const net = require('net');
const url = require('url');
const md5 = require('MD5')
const faker = require('faker');



// Create an HTTP tunneling proxy
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');

  console.log('Connection ok !')
});

httpServer.listen(8080)


const io = require('socket.io').listen(httpServer)
var users = {};

io.sockets.on('connection', function(socket){
	console.log('Nouveau user')

	for(var k in users)
	{
		socket.emit('new_user', users[k])
	}


	// ---------- LOGIN
	var me = false;

	//Reception
	socket.on('login', function(user){
		console.log(user)
		me = user
		me.id = user.mail.replace('@', '-').replace('.', '-');
		me.avatar = 'https://gravatar.com/avatar'+ md5(user.mail) +'?s=50';

		users[me.id] = me
		me.username = faker.name.findName(); // Rowan Nikolaus
		io.sockets.emit('new_user', me)
		socket.emit('logged')
	})

	// ---------- LOGOUT
	socket.on('disconnect', function(user){
		if(!me)
		{
			return false
		}
		delete users[me.id]
		io.sockets.emit('disconnect_user', me)
	})


	socket.on('post_message', function(message){
		message.user = me
		date = new Date()
		message.h = date.getHours()
		message.m = date.getMinutes()
		io.sockets.emit('post_message', message)
	})
})
















