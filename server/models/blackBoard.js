const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blackBoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Lecture Note", "Assignment"],
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    tutor: {
      type: mongoose.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlackBoard", blackBoardSchema);
