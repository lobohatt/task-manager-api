const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectioURL = 'mongodb://127.0.0.1:27017'  //can use localhost but its not recommended
const databaseName = 'task-manager' // can choose any database name


MongoClient.connect(connectioURL, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }


  const db = client.db(databaseName);

  /*db.collection('users').insertOne({
    name: 'LOBO',
    age: 27
  }, (error, result) => {

    if (error) {
      console.log('Unable to connect to users');
    }
    console.log(result.ops);
  });*/

  db.collection('users').insertMany([
    {
      name: 'hat',
      age: 22
    },
    {
      name: 'sam',
      age: '22'
    }
  ], (error, result) => {
    if (error) {
      return console.log('Unable to insert documents!');
    }

    console.log(result.ops);
  });

});






