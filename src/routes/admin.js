const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const mid = require('../middleware');

router.use(function(req, res, next) {
  console.log('middleware to authenticate admin');
  next();
});

router.get('/', function(req, res) {
  console.log('admin index page');
  res.render('admin/index');
});

router.get('/users', function(req, res) {
  console.log('admin user list');
  res.render('admin/user_list');
});

module.exports = router;
