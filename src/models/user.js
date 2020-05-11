const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task.js');

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
  }],
  avatar: {
    type: Buffer
  }
},
  {
    timestamps: true
  });


UserSchema.virtual('tasks', {
  ref: 'work',
  localField: '_id',    // where local data is stored // id of task // its get populated &givedata 
  foreignField: 'owner'  // is the name in other field // in task model // owner//conta. user id
});


UserSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}



UserSchema.methods.generateAuthToken = async function () {

  const user = this;


  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET); // signature can be an

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




//  Hash the plain text password before saving (middleware)
UserSchema.pre('save', async function (next) {

  const user = this  // for pointing each object property

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();

});


// Delete user tasks when user is removed (middleware)
//next to terminate the code
// If any user removed this code will run removing their tasks as well // 
// Associated tasks with owner user id will get deleted
UserSchema.pre('remove', async function (next) {
  const user = this;

  await Task.deleteMany({ owner: user._id })

  next();
});




const User = mongoose.model('sanatization', UserSchema);

module.exports = User