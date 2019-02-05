const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const User = require('../db/models/user');
const mid = require('../middleware');

module.exports = function(passport) {
  router.get('/', function(req, res) {
    res.send('Authentication endpoint');
  });
  router.post('/register', function(req, res, next) {
    if (
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.confirmPassword
    ) {
      // confirm passwords match
      if (req.body.password !== req.body.confirmPassword) {
        let err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      User.findOne({ email: req.body.email }, function(err, doc) {
        if (err) {
          return next(err);
        } else {
          if (doc) {
            let err = new Error('Email has already been registered');
            err.status = 501;
            return next(err);
          } else {
            const record = new User();
            record.email = req.body.email;
            record.password = record.hashPassword(req.body.password);
            record.save((err, user) => {
              if (err) {
                return next(err);
              } else {
                req.session.userId = user._id;
                res.send(user);
                // res.redirect('../profile')
              }
            });
          }
        }
      });
    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  });

  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '../profile',
      failureRedirect: '/login',
      failureFlash: true,
    }),
    function(req, res) {
      res.send('hello');
    },
  );

  // // POST /login
  // router.post('/login', function(req, res, next) {
  //
  //   if (req.body.email && req.body.password) {
  //     User.authenticate(req.body.email, req.body.password, function (error, user) {
  //       if (error || !user) {
  //         var err = new Error('Wrong email or password.');
  //         err.status = 401;
  //         return next(err);
  //       } else {
  //         req.session.userId = user._id;
  //         return res.redirect('/profile', {
  //           user: user
  //         });
  //       }
  //     });
  //   } else {
  //     var err = new Error('Email and password are required.');
  //     err.status = 401;
  //     return next(err);
  //   }
  // });

  router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

  return router;
};

// module.exports = router;
