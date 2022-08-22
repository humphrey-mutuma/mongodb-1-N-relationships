const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

module.exports = mongoose.model("Person", personSchema);
