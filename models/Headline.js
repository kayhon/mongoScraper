// step 7 here
// ((for step8 go to note.js ))

// npm package
var mongoose = require("mongoose");

// create schema using mongoose schema function
var Schema = mongoose.Schema;

// create new schemas name | &that requires headline &summary
var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    // mandatory so we dont get repeat articles over and over
    unique: true
  },

  summary: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  date: String,
  saved: {
    type: Boolean,
    // changes to true if user saves it
    default: false
  }
});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
