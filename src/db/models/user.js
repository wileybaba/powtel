const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'),
  SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
//
// UserSchema.post('save', function(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('Email address has already been registered!'));
//   } else {
//     next(error);
//   }
// });

// // hash password
// UserSchema.pre('save', function(next) {
//     var user = this;
//
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
//
//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);
//
//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

// authenticate input against database documents
// UserSchema.statics.authenticate = function(email, password, callback) {
//   User.findOne({ email: email })
//     .exec(function (error, user) {
//       if (error) {
//         return callback(err);
//       } else if ( !user ) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function(error, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }
//

const User = mongoose.model('User', UserSchema);
module.exports = User;
