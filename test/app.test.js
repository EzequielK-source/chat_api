const request = require("supertest");
const {
    httpServer,
    io
} = require('src/app')
const Client = require("socket.io-client")


const Message = require('src/message/message')
describe('Server App test', () => {
    let clientSocket, serverSocket;
    beforeAll((done) => {
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on('connection', socket => {
                serverSocket = socket
            });
			clientSocket.on('connect', done);
        })
    });
    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test("send message", done => {
		/**
			*Send message and check they
			*are added to message list and
			*the body structure of message
		**/
		const message = 'a new message'
		clientSocket.emit('create-message', message);
		clientSocket.on('get-messages', messages=>{
			let messageBody;
			console.log(messageBody);
			messages.forEach((element) => {
				if(element.message === message){
					messageBody = element;
					return ;
				}
			});
			expect(messageBody).not.toBeUndefined();
			expect(messageBody).toHaveProperty('date');
			done()
		})
	});
});
