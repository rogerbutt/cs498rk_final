/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Note = require('../api/note/note.model');
var Classes = require('../api/classes/classes.model');

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
  }, function(err, test, admin) {
      console.log('finished populating users');

      Classes.find({}).remove(function() {
        Classes.create({
          name: 'Web Programming',
          college: 'University of Illinois',
          department: 'CS',
          number: '498'
        }, function (err, c) {
          Note.find({}).remove(function() {
            Note.create({
              name: 'cs498rk final',
              owner: test._id,
              classRef: c._id,
              description: '"notes" on the cs498rk final',
              price: 1,
              ratingTotal: 50,
              ratingNum: 10,
              ref: "temp"
            });
          });
        });
      });


    }
  );
});