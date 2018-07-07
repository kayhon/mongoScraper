// step 8 here 
// ((for step9 go to sripts/scrape.js ))

// very similar to headline.js copied and paste then slightly adjusted
// few things and renaming few things 

// npm package
var mongoose = require("mongoose");

// create schema using mongoose schema function
var Schema = mongoose.Schema;

var noteSchema = new Schema({

// associated article that note is attached to.
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },

  date: String,

  noteText: String
});

// note model for use thru-out program
var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
