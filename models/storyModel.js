const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  title: { type: String, required: true },
});

module.exports = mongoose.model("Story", storySchema);
