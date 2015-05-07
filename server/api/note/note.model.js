'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  name: String,
  owner: { type: String, default: 'notr' },
  description: String,
  price: { type: Number, min: 0 },
  ref: String,
  date: { type: Date, default: Date.now },
  comments: [String]
});

// Validation

module.exports = mongoose.model('Note', NoteSchema);