const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fidelSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: password,
        required: true,
    },
    email: {
        type: email,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Fidel", fidelSchema);