const mongoose = require('mongoose');
const LocationSchema = new mongoose.Schema({
  name: { type: String, default: '', trim: true },
  logo: { type: String },
  class: { type: String, default: 'resort', trim: true },
  pass: { type: String, trim: true },
  snoCountryID: { type: Number },
  location: {
    country: { type: String, default: 'USA', trim: true },
    state: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    zip: { type: Number },
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: ' ',
    },
    coordinates: {
      type: [Number],
      required: true,
      default: ' ',
    },
  },
  current_resort_data: {},
  current_weather_data: {},
  resort_info: {
    vertical_m: { type: Number, default: '' },
    lifts: { type: Number, default: '' },
  },
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
