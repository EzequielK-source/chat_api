const express = require('express');
const {createServer} = require('http')
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const Message = require('src/message/message')
const messages = [

]

io.on("connection", socket =>{
	console.log('client connected');
	socket.on('create-message', messageText=>{
		const messageCreated = new Message(messageText);
		console.log('message created');
		messages.push(messageCreated);
		socket.emit('get-messages', messages)
	})

})


module.exports = {httpServer, io};
