const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomSchema = new Schema({
	title: { type: String, required: true },
	rent: { type: Number, required: true },
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date, default: Date.now },
	sqr: Number,
	postalCode: { type: Number, required: true },
	street: { type: String, required: true },
	district: { type: String, required: true },
	city: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: [String],
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;

