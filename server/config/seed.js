/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Note = require('../api/note/note.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Note.find({}).remove(function() {
  Note.create({
    name: 'cs498rk final',
    description: '"notes" on the cs498rk final',
    price: 1,
    ratingTotal: 50,
    ratingNum: 10,
    ref: "temp",
    comments: []
  });
});