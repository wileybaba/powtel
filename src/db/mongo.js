const mongoose = require('mongoose');
// .env for environment variables
require('dotenv').config();

// mongo connection
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

module.export = db
