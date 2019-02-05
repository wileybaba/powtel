const express = require('express');
const router = express.Router();
const Location = require('../db/models/location');
const mid = require('../middleware');

router.get('/', function(req, res) {
  res.send('Regions endpoint');
});

router.get('/:region', function(req, res, next) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const region = capitalizeFirstLetter(req.params.region);
  const region_query = { 'location.state': region };

  const maxSnowSort = { 'current_resort_data[0].snowLast48Hours': -1 };
  // const maxTerrainSort = {''}

  Location.find(region_query)
    .sort(maxSnowSort)
    .then(locations => {
      res.render('region', {
        title: region,
        data: locations,
      });
    })
    .catch(err => {
      res.render('error', {
        message: 'Region not found',
      });
    });
});

module.exports = router;
