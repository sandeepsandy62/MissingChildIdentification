const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pincode: { type: String, required: true },
  district: { type: String, required: true },
  image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('User',UserSchema);