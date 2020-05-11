const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const hatakee = mongoose.model('tasks', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const detail = new hatakee({
  name: 'Lobo',
  age: 22
});

detail.save().then(() => {
  console.log(detail);
}).catch((error) => {
  console.log('Error', error);
});