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

    test("ping pong test", done => {
		clientSocket.emit('ping');
		clientSocket.on('pong', ()=>{
			done()
		})
	});
});
