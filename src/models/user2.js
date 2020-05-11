const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invaid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});


UserSchema.methods.getPublicProfile = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}



UserSchema.methods.generateAuthToken = async function () {

  const user = this;


  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse'); // signature can be an

  user.tokens = user.tokens.concat({ token: token });                              //  anything
  await user.save(); // subdocument

  return token;

};






UserSchema.statics.findByCredentials = async (email, password) => {

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {

    throw new Error('Unable to login');

  }

  return user;

}




//  Hash the plain text password before saving
UserSchema.pre('save', async function (next) {

  const user = this  // for pointing each object property

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();

});


const User = mongoose.model('sanatization', UserSchema);

module.exports = User