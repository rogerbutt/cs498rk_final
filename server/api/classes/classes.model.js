'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassSchema = new Schema({
  name: String,
  college: String,
  department: String,
  number: Number,
  date: { type: Date, default: Date.now },
  notes: [String]
});

module.exports = mongoose.model('Class', ClassSchema);