const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const rateSchema = new Schema(
  {
    rate: {
      type: SchemaTypes.Decimal128,
      required: true, //can be turned of
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Rate", rateSchema);
