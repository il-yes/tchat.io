const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

// Create an HTTP
const httpServer = http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('okay');

  console.log('Connection ok !')
});



// Chargement de socket.io
var io = require('socket.io').listen(http);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});




httpServer.listen(7000);

