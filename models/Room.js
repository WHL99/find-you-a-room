const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomSchema = new Schema({
	title: String,
	rent: Number,
	postalCode: Number,
	address: String,
    description:String,
	imageUrl: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;

