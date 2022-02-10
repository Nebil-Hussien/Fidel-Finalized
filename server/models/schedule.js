const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  schedule_description: {
    type: String,
    required: true, //can be turned of
  },
  schedule_date: [
    {
      type: Date,
      required: true,
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});
module.exports = mongoose.model("Schedule", scheduleSchema);
