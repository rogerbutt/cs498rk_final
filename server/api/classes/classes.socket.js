/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Class = require('./classes.model');

exports.register = function(socket) {
  Class.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Class.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('classes:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('classes:remove', doc);
}