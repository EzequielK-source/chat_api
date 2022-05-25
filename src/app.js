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
	socket.on('create-message', messageOptions=>{
		/**
			*Create a Message instance, persist
			*they in chat database and emit event
			* with messages

			@param messageOptions {message, chat}
			@param message string
			@param chat string
		**/
		const messageCreated = new Message(messageOptions.message);
		messages.push(messageCreated);
		socket.emit('get-messages', messages)
	})
})


module.exports = {httpServer, io};
