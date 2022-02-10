const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allTokensSchema = new Schema({
    token: {
        type: String,
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref: "School",
    },
});

module.exports = mongoose.model("AllTokens", allTokensSchema);