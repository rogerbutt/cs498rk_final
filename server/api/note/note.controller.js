'use strict';

var _ = require('lodash');
var Note = require('./note.model');
var User = require('../user/user.model');

// Get list of notes
exports.index = function(req, res) {
  var where   = JSON.parse(req.query.where || "{}");
  var fields  = JSON.parse(req.query.select || "{}");
  var options = {
    sort: JSON.parse(req.query.sort || "{}"),
    skip: JSON.parse(req.query.skip || "{}"),
    limit: JSON.parse(req.query.limit || "{}")
  };

  Note.find(where, fields, options, function (err, notes) {
    if(err) { return handleError(res, err); }
    return res.json(200, notes);
  });
};

// Get a single note
exports.show = function(req, res) {
  Note.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    return res.json(note);
  });
};

// Creates a new note in the DB.
exports.create = function(req, res) {
  Note.create(req.body, function(err, note) {
    if(err) { return handleError(res, err); }

    if(note.owner !== 'notr') {
      User.findById(note.owner, function (err, user) {
        user.ownedNotes.push(note._id);
        user.save();
      });
    }

    return res.json(201, note);
  });
};

// Updates an existing note in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Note.findById(req.params.id, function (err, note) {
    if (err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    var updated = _.merge(note, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, note);
    });
  });
};

// Deletes a note from the DB.
exports.destroy = function(req, res) {
  Note.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    note.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get the s3 credientials
exports.policy = function(req, res) {

};

function handleError(res, err) {
  return res.send(500, err);
}