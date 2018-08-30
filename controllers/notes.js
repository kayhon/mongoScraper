// step 12 here
// ((for step13 go to config/routes.js and finish the routes ))

// similar to headline.js but 1big diff is no fetch function

var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
  get: function(data, cb) {
    Note.find(
      {
        _headlineId: data._id
      },
      cb
    );
  },

  save: function(data, cb) {
    // new object
    var newNote = {
      // headline id associated w/note being created etc
      _headlineId: data._id,
      date: makeDate(),
      noteText: data.noteText
    };

    // creates new note or sends error
    Note.create(newNote, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);

        cb(doc);
      }
    });
  },

  // removes notes associated w/articles
  delete: function(data, cb) {
    Note.remove(
      {
        _id: data._id
      },
      cb
    );
  }
};
