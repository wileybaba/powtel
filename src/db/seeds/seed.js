// const mongoose = require('mongoose');
// const Location = require('../db/models/location');
// require('dotenv').config();
// mongoDB = process.env.MONGO_URI
// mongoose.connect('mongodb://localhost:27017/powtel',{ useNewUrlParser: true }, function(err, client) {
//
//   assert.equal(null, err);
//   const db = client.db('db');
//
//   var myPromise = () => {
//     return new Promise((resolve, reject) => {
//       const location = new Location({
//           name: 'Vail',
//           location: {
//             type: 'Point',
//             coordinates: [ 39.613849, -106.354959 ]
//           },
//           current_snow_data: {
//             h24total: 69,
//             h72total: 54,
//             surface_conditions: "powder"
//           }
//         });
//       location.save(function (err, location, exit) {
//         if (err) return console.error(err);
//       });
//     });
//   };
//
//   var result = await myPromise();
//
//   mongoose.disconnect();
//
// };
