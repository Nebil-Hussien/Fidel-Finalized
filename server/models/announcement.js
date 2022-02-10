const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postDate: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Announcement", announcementSchema);