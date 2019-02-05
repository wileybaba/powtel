const express = require('express');
const router = express.Router();
const Location = require('../db/models/location');
const mid = require('../middleware');

router.get('/', function(req, res) {
  res.send('Locations endpoint');
});

router.get('/:name', function(req, res, next) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function splitName(string) {
    const newString = string.split('-');
    return newString.join(' ');
  }

  const lowercase = capitalizeFirstLetter(req.params.name);
  const name = splitName(lowercase);
  const name_query = { name: name };

  Location.find(name_query)
    .then((locations, chanceofsnow) => {
      res.render('resort', {
        data: locations,
        chanceofsnow: 'test',
      });
    })
    .catch(err => {
      res.render('error', {
        message: 'Location not found',
      });
    });
});

module.exports = router;
