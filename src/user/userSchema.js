var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.']
  },

  lastName: {
    type: String,
    required: [true, 'Last name is required.']
  },

  userId: {
    type: String,
    unique: [true, 'Userid must be unique.'],
    maxlength: [15, 'Userid cannot be longer then 15 characters.'],
    minlength: [3, 'Userid must be longer then 2 charecters'],
    required: [true, 'Userid is required.']
  },

  email: {
    type: String,
    required: [true, 'Email is required.'],
    //match: [/\A[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z/, 'It is not a valid email address.']
  },

  password: {
    type: String,
    set: function(password) {
      this.salt = this.makeSalt();
      return this.encryptPassword(password);
    }
  },

  salt: {
    type: String
  },

  created: {
    type: Date,
    default: function() {
      return new Date();
    }
  },

  active: {type: Boolean, defult: true},


});

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   */
  authenticate: function(password) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

mongoose.model('User', UserSchema);
