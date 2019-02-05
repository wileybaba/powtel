const fetch = require('node-fetch');
const Location = require('./db/models/location');
const mongo = require('./db/mongo')

const fetchSnoCountry = (location) => {
  Location.find(
    {'snoCountryID': {'$ne': null}},
    (err, locations) => {
      if (err) {
        console.log('error')
      } else {
        for (i=0; i<locations.length; i++) {
          const fetchFunction = () => {
            let snoCountryID = locations[i].snoCountryID
            const url = 'http://feeds.snocountry.net/conditions.php?apiKey=SnoCountry.example&ids=' + snoCountryID

            fetch(url)
              .then(res => res.json())
              .then(data => {
                const dataObject = data.items
                Location.findOneAndUpdate(
                  {'snoCountryID': snoCountryID},
                  {$set:{'current_resort_data': dataObject}},
                  {upsert: true, new: true},
                  function (err, doc) {
                    console.log('success')
                  }
                )
              }).catch(err => {
                console.log(err)
              })
          }
          fetchFunction();
          }
        }
    })
}

fetchSnoCountry()
setInterval(fetchSnoCountry, 1.8e+6)
