const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classRoomSchema = new Schema(
  {
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    duration: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ClassRoom", classRoomSchema);
