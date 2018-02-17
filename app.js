const http = require('http');
const net = require('net');
const url = require('url');


// Create an HTTP tunneling proxy
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');

  console.log('Connection ok !')
});

httpServer.listen(8080)