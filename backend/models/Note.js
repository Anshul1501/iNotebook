const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //it's like a forgin key
        ref: "user", // reference object
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model("notes", NotesSchema);