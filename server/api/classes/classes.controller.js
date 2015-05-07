'use strict';

var _ = require('lodash');
var Class = require('./classes.model');

// Get list of classs
exports.index = function(req, res) {
  Class.find(function (err, classes) {
    if(err) { return handleError(res, err); }
    return res.json(200, classes);
  });
};

// Get a single class
exports.show = function(req, res) {
  Class.findById(req.params.id, function (err, classes) {
    if(err) { return handleError(res, err); }
    if(!classes) { return res.send(404); }
    return res.json(classes);
  });
};

// Creates a new class in the DB.
exports.create = function(req, res) {
  Class.create(req.body, function(err, classes) {
    if(err) { return handleError(res, err); }
    return res.json(201, classes);
  });
};

// Updates an existing class in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Class.findById(req.params.id, function (err, classes) {
    if (err) { return handleError(res, err); }
    if(!classes) { return res.send(404); }
    var updated = _.merge(classes, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, classes);
    });
  });
};

// Deletes a class from the DB.
exports.destroy = function(req, res) {
  Class.findById(req.params.id, function (err, classes) {
    if(err) { return handleError(res, err); }
    if(!classes) { return res.send(404); }
    classes.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}