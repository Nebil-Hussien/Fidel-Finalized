const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const superAdminSchema = new Schema({
    administrator: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("SuperAdmin", superAdminSchema);