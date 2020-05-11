const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
});

const data = mongoose.model('sanatization', {
  name: {
    type: String,                   // required
    required: true,
    trim: true
  },
  email: {
    type: String,
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
  }
});

const hello = new data({
  name: ' Godly',
  email: ' godly@gamil.com ',
  age: 22,
  password: 'qwertytrewq'
});

hello.save().then(() => {
  console.log(hello);
}).catch((error) => {
  console.log('Error', error);
});
