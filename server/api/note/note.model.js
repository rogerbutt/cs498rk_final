'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  name: String,
  owner: String,
  description: String,
  price: Number,
  ref: String,
  comments: String
});

module.exports = mongoose.model('Note', NoteSchema);