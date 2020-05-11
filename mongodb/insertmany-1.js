// Update // Promise without const // inc


const { MongoClient, ObjectID } = require('mongodb');//MongoClient is property of mongodb & ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);


  db.collection('bool').insertMany([
    {
      task: 'finished homework',
      completed: false
    },
    {
      task: 'finished breakfast',
      completed: true
    }, {
      task: 'finished gaming',
      completed: false
    }
  ], (error, result) => {
    if (error) {
      return console.log('error');
    }
    console.log(result.ops);
  });

});
