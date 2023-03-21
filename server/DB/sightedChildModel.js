const mongoose = require("mongoose");

const sightedChildSchema = new mongoose.Schema({
  basicDetails: {
    name: { type: String, required: true },
    dateOfSighting: { type: Date, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    reason: { type: String, required: true },
  },
  location: {
    sightedAddress: { type: String, required: true },
    sightedDistrict: { type: String, required: true },
    sightedPincode: { type: String, required: true },
    sightedState: { type: String, required: true },
  },
  img: { data: Buffer, ContentType: String}, // Assuming `uploadMedia` is an object containing the uploaded image data.
});

const SightedChild = mongoose.model("SightedChild", sightedChildSchema);

module.exports = SightedChild;
