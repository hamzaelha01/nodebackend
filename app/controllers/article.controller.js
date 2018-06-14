const Article = require('../models/article.model.js');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://18.222.50.114:27017/";
// Create and Save a new Note
exports.create = (req, res) => {

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    // Article.find()
    //     .then(articles => {
    //         res.send(articles);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving notes."
    //         });
    //     });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("whiteH");
        dbo.collection("whiteArticles").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};