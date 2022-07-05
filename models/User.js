const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  birthday: { type: Date },
  gender: String,
  city: String,
  phoneNumber: Number,
  passwordHash: String,
});

const User = model("User", userSchema);

module.exports = User;
