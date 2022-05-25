const express = require('express');
const {createServer} = require('http')
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const messages = [

]

io.on("connection", socket =>{
	console.log('client connected');
	socket.on('create-message', message=>{
		console.log('message created');
		messages.push(message);
		socket.emit('new-message', messages)
	})

})


module.exports = {httpServer, io};
