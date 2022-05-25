const request = require("supertest");
const app = require('src/app')

describe('Server App test', () => {
	test('basic request', (done) => {
		request(app)
			.get('/')
			.then(response=>{
				expect(response.statusCode).toBe(200)
				done()
			})
	});
});
