'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user: String,
  rating: {type: Number, default: 1} ,
  // note: String,
  body: String,
  noteRef: String
});

module.exports = mongoose.model('Comment', CommentSchema);






