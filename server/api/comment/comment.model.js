'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  name: String,
  user: String,
  rating: Number,
  note: String,
  body: String
});

module.exports = mongoose.model('Comment', CommentSchema);