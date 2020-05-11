// By Object

//const mongodb = require('mongodb');
//const MongodbClient = mongodb.MongoClient;
//const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');//MongoClient is property of mongodb & ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);

  db.collection('users').find({ name: 'john cena' }).toArray((error, user) => {
    console.log(user);
  });

  db.collection('users').find({ name: 'john cena' }).count((error, count) => {
    console.log(count);
  });
});
