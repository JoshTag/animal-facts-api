const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Animal Schema
const AnimalSchema = new Schema({
  name: {
    type: String,
    require: [true, "An animal name must be included"],
    unique: true
  },
  facts: {
    type: Array,
    required: [true, "Facts must be included"]
  }
}, {
  collection: "animals"
});

module.exports = Animal = mongoose.model("animal", AnimalSchema);