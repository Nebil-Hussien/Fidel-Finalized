const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    // required: true,
  },
  address: {
    subCity: {
      type: String,
      // required: true,
    },
    wereda: {
      type: String,
      // required: true,
    },
    houseNumber: {
      type: String,
      // required: true,
    },
    homePhoneNumber: {
      type: String,
      // required: true,
    },
  },
  mobile_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  actMode: {
    type: Boolean,
    default: true,
  },
  score: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Score",
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
