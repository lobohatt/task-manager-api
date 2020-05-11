const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const challenge = mongoose.model('sanatization', {
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


const details = new challenge({
  password: 'qwertytrewq'
});

details.save().then(() => {
  console.log(details);
}).catch((error) => {
  console.log('Error', error);
})
