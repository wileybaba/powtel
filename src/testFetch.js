const fetch = require('node-fetch')
const fs = require('fs')

const url = 'http://feeds.snocountry.net/getResortList.php?apiKey=SnoCountry.example&states=or&resortType=alpine&output=json'
const targetFile = 'db/seeds/oregon_seeds.json'
// const url = 'http://feeds.snocountry.net/conditions.php?apiKey=SnoCountry.example&ids=303013'
// fs.writeFile('db/seeds/state_seeds.json', "TESTING", (err) => {} )

fetch(url)
  .then(res => res.json())
  .then(data => {

    data.items.forEach((el)=> {

      let resort = {
        name: el.resortName,
        pass: "",
        class: "resort",
        snoCountryID: Number(el.id),
        location: {
          country: "USA",
          state: "Oregon",
          city: "",
          type: 'Point',
          coordinates: []
        }
      }

      let data = JSON.stringify(resort, null, 4)

      fs.appendFile(targetFile, data, (err) => {
        if (err) throw err;
      })

    })
    console.log(data.items.length)
  })
  .catch(err => {
    console.log(err)
  })
