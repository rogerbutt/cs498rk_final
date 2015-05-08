/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Note = require('../api/note/note.model');
var Classes = require('../api/classes/classes.model');
var Comment = require('../api/comment/comment.model');

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
    password: 'admin',
    credits: 5,
    boughtNotes: ['425midtermI']
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
              ownerName: test.name,
              classRef: c._id,
              description: '"notes" on the cs498rk final',
              price: 1,
              ratingTotal: 50,
              ratingNum: 10,
              ref: "temp"
            }, function(err, note) {
              Comment.find({}).remove(function() {
                Comment.create({
                  user: test._id,
                  rating: 5,
                  note: note._id,
                  body: 'Such note',
                  noteRef: note._id
                }, function(err, comment) {
                  note.comments.push(comment._id);
                  note.save();
                });

              })
            });
          });
        });
      });

      Classes.find({}).remove(function() {
        Classes.create({
          name: 'Distributed Systems',
          college: 'University of Illinois',
          department: 'CS',
          number: '425'
        }, function (err, c) {
          Note.find({}).remove(function() {
            Note.create({
              name: 'cs425 homework 3',
              owner: admin._id,
              ownerName: admin.name,
              classRef: c._id,
              description: 'solution to homework 3 for spring 2014',
              price: 1,
              ratingTotal: 50,
              ratingNum: 10,
              ref: "425hw3"
            }),
            Note.create({
              name: 'cs425 midterm I',
              owner: test._id,
              ownerName: test.name,
              classRef: c._id,
              description: 'practice midterm for fall 2012',
              price: 1,
              ratingTotal: 50,
              ratingNum: 10,
              ref: "425midtermI"
            })
          });
        });
      });


    }
  );
});