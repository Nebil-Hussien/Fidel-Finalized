const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseEnrollment = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    receipt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receipt",
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CourseEnrollment", courseEnrollment);
