const manga = require('../models/manga.model.js');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://18.191.146.33:27017/";
//var url = "mongodb://127.0.0.1:27017/";

// Create and Save a new Note
exports.create = (req, res) => {

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({}).limit(100).project({
            _id: 0,
            title: 1,
            views: 1
        }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
};

exports.findNewest = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({ "label": "newest" }).limit(10).project({ title: 1, views: 1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
}

exports.findTop = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({
            "label": "best"
        }).project({
            title: 1,
            views: 1
        }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
}
exports.findCompleted = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({
            "status": "completed"
        }).project({
            title: 1,
            views: 1
        }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
}
exports.findLatest = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({
            "status": "latest"
        }).limit(10).project({
            title: 1,
            views: 1
        }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
}
exports.findOne = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var val = req.params.title
        var dbo = db.db("mangareader");
        dbo.collection("mangas").find({
            "title": val
        }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
}

exports.mangaChap = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conditions = req.params.condtions;
        var options = req.params.options;
        var dbo = db.db('mangareader');
        dbo.collection("mangas").findOne(
            conditions, options,
            function(err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                db.close();
            });
    });
}

// exports.findAll = (req, res) => {

//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var stream = db.db("mangasreader").collection("mangas").find().streamRecords();

//         stream.on('data', function(item) {
//             var prefix = first ? '' : ', ';
//             response.write(prefix + JSON.stringify(item));
//             first = false;
//         });
//         stream.on('end', function() {
//             response.write(']}');
//             response.end();
//         });
//     });
// }

// Find a single note with a noteId
// exports.findOne = (req, res) => {

// };

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};