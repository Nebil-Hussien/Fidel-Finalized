const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
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
    requierd: true,
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
});

module.exports = mongoose.model("Tutor", tutorSchema);
