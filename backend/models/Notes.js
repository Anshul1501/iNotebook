const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: string,
        required: true
    },
    discription: {
        type: string,
        required: true
    },
    tag: {
        type: string,
        default: "General"
    },
    date: {
        type: string,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);