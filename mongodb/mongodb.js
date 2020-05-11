const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectioURL = 'mongodb://127.0.0.1:27017'  //can use localhost but its not recommended
const databaseName = 'task-manager' // can choose any database name


MongoClient.connect(connectioURL, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }
  //console.log('connected correctly');

  const db = client.db(databaseName);    //takes database name
  //  Mongo have collections  // inside that documents // files
  db.collection('users').insertOne({        // Giving collection name
    name: 'LOBO',                       //Insertion of documents in collection    
    age: 27
  });
});