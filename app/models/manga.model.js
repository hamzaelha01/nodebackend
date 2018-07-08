const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: String,
    status: String,
    rating: String,
    Genres: [],
    views: String,
    title: String,
    Chapters: {
        chatper_title: String,
        chapter_episode: {
            episode_image: String,
            episode_title: String
        }
    }
});

module.exports = mongoose.model('Manga', NoteSchema);