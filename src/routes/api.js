const express = require('express');
const router = express.Router();
const Location = require('../db/models/location');
const mid = require('../middleware');

router.use(function(req, res, next) {
  console.log('middleware to authenticate admin');
  next();
});

router.get('/', function(req, res) {
  res.send('API endpoint');
});

router.get('/locations', (req, res) => {
  const query = req.query;

  // let filters = null
  // if (query.state != null){
  //   filters = {
  //     state: {$mongquery params query.state}
  //   }
  // }

  Location.find(query)
    .then(locations => {
      res.json({
        confirmation: 'success',
        data: locations,
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        message: err.message,
      });
    });
});

router.get('/locations/:state', (req, res) => {
  const state = req.params.state;

  Location.find({ location: { name: state } })
    .then(locations => {
      res.json({
        confirmation: 'success',
        data: locations,
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: 'Location not found',
      });
    });
});
// router.post('/locations', (req, res) => {
//   res.json({
//     confirmation: 'success',
//     data: req.body
//   })
// })
module.exports = router;
