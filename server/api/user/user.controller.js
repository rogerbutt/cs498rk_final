'use strict';

var User = require('./user.model');
var Note = require('../note/note.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

var checkPurchased = function(id, idlst) {
  for(var i = 0; i < idlst.length; i++) {
    if(id === idlst[i]) {
      return true;
    }
  }
  return false;
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Purchase note
 */
exports.purchase = function(req, res, next) {
  var userId = req.user._id;
  var noteId = String(req.body.noteId);

  User.findById(userId, function (err, user) {
    Note.findById(noteId, function (err, note) {

      if(!checkPurchased(noteId, user.ownedNotes) && !checkPurchased(noteId, user.boughtNotes) && user.credits >= note.price) {

        // Credit the owner
        if(note.owner !== 'notr') {
          User.findById(note.owner, function(err, owner) {
            owner.credits += note.price;
            owner.save();
          });
        }
        user.credits -= note.price;
        user.boughtNotes.push(noteId);

        user.save(function(err) {
          if (err) return validationError(res, err);
          res.send(200);
        });
      }
      else {
        console.log('here');
        res.send(403);
      }
    });
  });
};

/**
 * Add credits to the account
 */
exports.credit = function(req, res, next) {
  var userId = req.user._id;
  var credits = parseInt(req.body.credits);

  User.findById(userId, function (err, user) {
    user.credits += credits;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Deletes the credit card on the account
 */
exports.deleteCard = function(req, res, next) {
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    user.paymentInfo = "";
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

/**
 * Edits the credit card on the account
 */
exports.editCard = function(req, res, next) {
  var userId = req.user._id;
  var paymentInfo = req.body.payment;

  User.findById(userId, function (err, user) {
    user.paymentInfo = paymentInfo;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword').populate('ownedNotes boughtNotes').exec(function (err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    console.log(user);
    res.json(user);
  });

  /*
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });

  User.findOne({ _id: userId }).populate('ownedNotes').exec(function(err, notes) {
    console.log('FUCK');
    console.log(notes);
  });*/
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
