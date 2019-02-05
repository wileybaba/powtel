const mongoose = require('mongoose');
const SnotelSchema = new mongoose.Schema({
  station_id: {type: Number},
  name: {type: String, trim, true},
  position: {
    state: {type: String, default: '', trim: true},
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: ' ',
    },
    coordinates: {
      type: [Number],
      required: true,
      default: ' '
    }
  },
  data: {
    airTemperatureAverage:{ type: Number },
    precipitationAccumulation:{ type: Number },
    relativeHumidityAverage:{ type: Number },
    snowDepth:{ type: Number },
    snowWaterEquivalent:{ type: Number },
    soilTemperatureAverage:{ type: Number },
    solarRadiationAverage:{ type: Number },
    snowDensity:{ type: Number },
    snowRainRatio:{ type: Number },
    windSpeedAverage:{ type: Number },
    },
  }
})
