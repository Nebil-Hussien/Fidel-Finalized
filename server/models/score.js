const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      // required: true,
    },
    assessment: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    timeOfCompletion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
