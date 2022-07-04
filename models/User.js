const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  birthday: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  phoneNumber: Number,
  password: String,
});



const User = model("User", userSchema);

module.exports = User;



