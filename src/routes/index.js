const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const auth = require('../routes/auth');
const Location = require('../db/models/location');
const mid = require('../middleware');

// router.get('/', function(req, res, next) {
// return res.render('index', { title: 'Home' });
// info = Location.find({ name: 'Copper'})
// return info
// });

router.get('/map', (req, res, next) => {
  res.render('us_map')
})

router.get('/', (req, res, next) => {
  if (req.query.search) {
    // Get locations from db
    Location.find();
  }

  Location.find() // put customized query here.  i.e. most snow
    .then(locations => {
      res.render('index', {
        title: 'Home',
        data: locations,
        message: req.flash('error'),
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
      });
    });
});

router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

router.get('/chat', mid.requiresLogin, function(req, res, next) {
  return res.render('chatroom', { title: 'Powder Chat' });
});

router.get('/login', function(req, res, next) {
  return res.render('login', {
    title: 'Login',
    message: req.flash('error'),
  });
});

router.get('/profile', mid.requiresLogin, function(req, res, next) {
  // User.findOne({email: user.email})
  //   .then(users => {
  //     res.render('user/profile', {data: user})
  //   })
  //   .catch(err => {
  //     res.json({
  //       confirmation: 'fail',
  //       message: 'User not found'
  //     })
  //   })
  res.render('user/profile', {
    title: 'Profile',
    user: req.session.passport.user,
  });
});

router.get('/membersHomePage', mid.requiresLogin, function(req, res, next) {
  res.render('user/profile', { title: 'Profile' });
});

module.exports = router;
