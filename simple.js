/**
 * Motivation:
 * Wanted to put together some code that used:
 *  - BlueBird (promises)
 *  - MongoDB NodeJS Driver
 *  - and paging that did not rely on skip()
 *
 * References:
 * Based on articles such as:
 * https://scalegrid.io/blog/fast-paging-with-mongodb/
 * and GitHub puclic code searches such as:
 * https://github.com/search?utf8=%E2%9C%93&q=bluebird+MongoClient+_id+find+limit+gt+language%3Ajavascript+&type=Code&ref=searchresults
 * which yielded smaple code hits such as:
 * https://github.com/HabitRPG/habitrpg/blob/28f2e9c356d7053884107d90d04e28dde75fa81b/migrations/api_v3/coupons.js#L71
 */

var Promise = require('bluebird'); // jshint ignore:line
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var dbHandleForShutDowns;

// option a: great for debugging
var logger = require('tracer').console();
// option b: general purpose use
//var logger = console;

//...

var getPage = function getPage(db, collectionName, query, projection, pageSize, processPage) {
    //console.log('DEBUG', 'filter:', JSON.stringify(query,null,2));
    projection = (projection) ? projection['_id'] = true : {
        '_id': true
    };
    return db
        .collection("mangas")
        .find(query)
        .project(projection)
        .sort({
            '_id': 1
        }).limit(pageSize)
        .toArray() // cursor methods return promises: http://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html#toArray
        .then(function processPagedResults(documents) {
            if (!documents || documents.length < 1) {
                // stop - no data left to traverse
                return Promise.resolve();
            } else {
                if (documents.length < pageSize) {
                    // stop - last page
                    return processPage(documents);
                } else {
                    return processPage(documents) // process the results of the current page
                        .then(function getNextPage() { // then go get the next page
                            var last_id = documents[documents.length - 1]['_id'];
                            query['_id'] = {
                                '$gt': last_id
                            };
                            return getPage(db, collectionName, query, projection, pageSize, processPage);
                        });
                }
            }
        });
};

//...

return MongoClient
    .connect(params.dbUrl, {
        promiseLibrary: Promise
    })
    .then(function(db) {
        dbHandleForShutDowns = db;
        return getPage(db, collectionName, {}, {}, 5, function processPage(pagedDocs) {
                console.log('do something with', pagedDocs);
            })
            .finally(db.close.bind(db));
    })
    .catch(function(err) {
        console.error("ERROR", err);
        dbHandleForShutDowns.close();
    });