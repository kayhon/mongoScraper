// step 11 here
// ((for step12 go to controller/notes.js ))

// from scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// from models
var Headline = require("../models/Headline");

// all deleting, get, update, save, etc. functality code to
// be used thru-out program is inside this obj
module.exports = {
  // grabs all articles and inserts them into headline collection in mongo db
  fetch: function(cb) {
    scrape(function(data) {
      var article = data;
      //  for each article do the following:
      for (var i = 0; i < article.length; i++) {
        article[i].date = makeDate();
        article[i].saved = false;
      }
      // running mongo mini-function that takes h.line and inserting into that collection many articles.
      // not ordered to keep it working even if thers an error with 1 article. basically
      // prevents it from stoping and throwing error if thers a prob with 1 of them and keeps it going

      Headline.collection.insertMany(article, { ordered: false }, function(
        err,
        docs
      ) {
        // returns any errors
        cb(err, docs);
      });
    });
  },
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
    Headline.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  // updates any new articles
  update: function(query, cb) {
    Headline.update(
      { _id: query._id },
      {
        $set: query
      },
      {},
      cb
    );
  }
};
