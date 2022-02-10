const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  tutionFee: {
    type: Number,
    required: true,
  },
  delivery_Lang: {
    type: String,
    required: true,
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: "Tutor",
    required: false,
  },
  schedule: [
    {
      type: Date,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Course", courseSchema);
