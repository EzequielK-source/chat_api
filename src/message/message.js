const moment = require('moment');
module.exports = class Message {
	constructor(message) {
		this.date = moment().format("Hm")
		this.message = message;
	}
}
