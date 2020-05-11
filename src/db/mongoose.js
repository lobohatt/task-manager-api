const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {// task-manager-api // databasename
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true               // mongoose perfecty work with mongodb // creating indexes
});

const User = mongoose.model('User', {

  name: {
    type: String                                    // "Defining Model"

  },
  age: {
    type: Number
  }

});


const me = new User({
  name: 'Lobo',                                    // "Creating Instances"
  age: 22
});

me.save().then(() => {                      // returns promise
  console.log(me);                                    // "Saving Instance to database"
}).catch((error) => {
  console.log('Error!', error);
});                                            