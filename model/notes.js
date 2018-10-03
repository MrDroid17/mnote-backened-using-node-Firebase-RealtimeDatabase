const mongoose = require('mongoose');

//user schema
const NoteSchema = mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Note = module.exports = mongoose.model('Note', NoteSchema);