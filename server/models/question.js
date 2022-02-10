const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment",
  },
  question: [
    {
      question: {
        type: String,
        required: true,
      },
      choice1: {
        type: String,
        required: true,
      },
      choice2: {
        type: String,
        required: true,
      },
      choice3: {
        type: String,
        required: true,
      },
      choice4: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
