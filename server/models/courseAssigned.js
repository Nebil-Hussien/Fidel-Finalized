const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseAssigned = new Schema(
  {
    tutor: {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CourseAssigned", courseAssigned);
