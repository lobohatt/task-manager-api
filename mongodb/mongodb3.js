const mongodb = require('mongodb');
const MongodbClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongodbClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);

  db.collection('tasks').insertMany([
    {
      name: 'john',
      age: 22
    },
    {
      name: 'sam',
      age: 22
    }
  ], (error, result) => {
    if (error) {
      return console.log('unable to connect to tasks');
    }
    console.log(result.ops);
  });

});

