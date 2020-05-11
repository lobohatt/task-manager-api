// Delete operation MongoDB

const { MongoClient, ObjectID } = require('mongodb');//MongoClient is property of mongodb & ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);

  /*db.collection('users').deleteMany({
    age: 27
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });*/

  /*db.collection('bool').deleteMany({
    completed: false
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });*/

  db.collection('bool').deleteOne({
    task: 'finished breakfast'
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });


});
