const request = require("supertest");
const {
    httpServer,
    io
} = require('src/app')
const Client = require("socket.io-client")

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
		const message = 'a new message'
		clientSocket.emit('create-message', message);
		clientSocket.on('new-message', messages=>{
			expect(messages.includes(message)).toBe(true)
			done()
		})
	});
});
