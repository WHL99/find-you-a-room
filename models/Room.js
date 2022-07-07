const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomSchema = new Schema({
	title: String,
	rent: Number,
	startDate: {type: Date, default: Date.now},
	endDate: {type: Date, default: Date.now},
	sqr: Number,
	postalCode: Number,
	street: String,
	district: String,
	city: String,
	description: String,
	imageUrl: [String],
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;

