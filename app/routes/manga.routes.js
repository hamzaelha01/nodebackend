module.exports = (app) => {
    const mangas = require('../controllers/manga.controller.js');

    // Create a new Note
    //app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/mangas', mangas.findAll);
    app.get('/newest', mangas.findNewest);
    app.get('/latest', mangas.findLatest);
    app.get('/completed', mangas.findCompleted);
    app.get('/top', mangas.findTop);
    app.get('/manga/:title', mangas.findOne);
    app.get('/one/:conditions/:options', mangas.mangaChap);
    app.get('/all/:conditions/:options/:skip/:limit', mangas.mangasD);

    // Retrieve a single Note with noteId
    //app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    //app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    //app.delete('/notes/:noteId', notes.delete);
}