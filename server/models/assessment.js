const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assessmentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["quiz", "test"],
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: true,
    },
    tutor: {
      type: mongoose.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    dateOfExamination: {
      type: String,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
    },
    totalMark: {
      type: Number,
      required: true,
    },
    questionData: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
