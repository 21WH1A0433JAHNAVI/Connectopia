const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 4000; // Replace with your desired port number

const defaultEquation = 'x^2 + y^2'; // Default equation for new clients

const users = {}; // Store user information

io.on('connection', (socket) => {
  console.log('A user connected.');

  // Send default equation to the new client
  socket.emit('equation', defaultEquation);

  // Store user information
  users[socket.id] = { equation: defaultEquation };

  // Listen for updates from clients and broadcast them to all connected clients
  socket.on('updateGraph', (data) => {
    users[socket.id].equation = data.equation;
    io.emit('updateGraph', users);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
    delete users[socket.id];
    io.emit('updateGraph', users);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
