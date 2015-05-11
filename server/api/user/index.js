'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/purchase', auth.isAuthenticated(), controller.purchase);
router.put('/:id/credit', auth.isAuthenticated(), controller.credit);
router.put('/:id/deletecard', auth.isAuthenticated(), controller.deleteCard);
router.put('/:id/editcard', auth.isAuthenticated(), controller.editCard);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
