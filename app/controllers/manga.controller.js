const manga = require('../models/manga.model.js');
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://18.191.97.37:27017/";
var url = "mongodb://127.0.0.1:27017/";

// Create and Save a new Note
exports.create = (req, res) => {

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({}).toArray(function(err, result) {
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