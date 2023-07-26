const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

const PORT = 4000; // Replace with your desired port number

const defaultEquation = 'x^2'; // Default equation for new clients

io.on('connection', (socket) => {
  console.log('A user connected.');

  // Send default equation to the new client
  socket.emit('equation', defaultEquation);

  // Listen for updates from clients and broadcast them to all connected clients
  socket.on('updateGraph', (data) => {
    io.emit('graphData', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
