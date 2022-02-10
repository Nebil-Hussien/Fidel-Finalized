const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    course_enrollment: {
      type: mongoose.Types.ObjectId,
      ref: "CourseEnrollment",
    },
    receiptVerification: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Receipt", receiptSchema);
