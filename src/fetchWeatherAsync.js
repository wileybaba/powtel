// const Location = require('./db/models/location')
// const fetch = require('node-fetch')
// const _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
// const _PremiumApiKey = '071b52f15c92406fa7d41401182911';
// let zip_code = 80435 //create loop to loop through all zip codes in db and send data
// let time_period = 24
// const url = _PremiumApiBaseURL + 'ski.ashx?q=' + zip_code + '&format=' + 'json' + '&key=' + _PremiumApiKey; +'&tp=' + time_period
//
// const fetchWeather = async (url) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       let dataObject = JSON.stringify((data.data.weather[0].bottom), null, 2)
//       Location.find(
//        {'location.zip': zip_code }, (err, location) => {
//          location.current_resort_data.temperature = dataObject
//          location.save()
//          console.log('test')
//        }
//       )
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//
//
//
//
//
//
//
// // setInterval(fetchWeather, 7.2e+6)
//
// module.exports = fetchWeather
