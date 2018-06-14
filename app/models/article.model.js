const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: String,
    thumbnail: String,
    article: String,
    description: String,
    title: String
});

module.exports = mongoose.model('Article', NoteSchema);