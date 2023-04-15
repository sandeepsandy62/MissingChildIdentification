const mongoose = require("mongoose");

const missingChildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfMissing: { type: Date, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  relationship:{type:String,required:true},
  description: { type: String, required: true },
  fatherName: { type: String, required: true },
  fatherEmail: { type: String, required: true },
  fatherMobileNumber: { type: String, required: true },
  childAdhaarNumber: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  img: { data: Buffer, contentType: String }, // Assuming `uploadMedia` is an object containing the uploaded image data.
  height:{type: String, required: true},
  identificationMarks:{type: String, required: true},
  mentallyIll:{type: String, required: true},
  bottomWear:{type: String, required: true},
  topWear:{type: String, required: true},
});

const MissingChild = mongoose.model("MissingChild", missingChildSchema);

module.exports = MissingChild;
