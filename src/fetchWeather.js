const fetch = require('node-fetch');
const Location = require('./db/models/location');
const mongo = require('./db/mongo')

const getCoordinates = (location) => {
  Location.find(
    {'location.coordinates': {'$ne': null}},
    (err, locations) => {
    if (err) {
      console.log('error')
    }
    else {

      for (i=0; i<locations.length; i++) {

        const fetchWeather = () => {

          let coordinates = locations[i].location.coordinates

          const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=imperial&APPID=9d9d5dda0263a7522a350addd043eb0e'

          fetch(url)
            .then(res => res.json())
            .then(data => {
              const  dataObject = data.main
              Location.findOneAndUpdate(
                {'location.coordinates': coordinates},
                {$set:{'current_weather_data': dataObject}},
                {upsert: true, new: true},
                function (err, doc) {
                  console.log('weather fetched')
                }
              )
            }).catch(err => {
              console.log(err)
            })
        }
        fetchWeather();
      }
    }
  })
}

// getCoordinates();
setInterval(getCoordinates, 1.8e+6);
