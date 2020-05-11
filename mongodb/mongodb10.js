// Update // Promise without const // inc


const { MongoClient, ObjectID } = require('mongodb');//MongoClient is property of mongodb & ObjectID also


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);

  db.collection('users').updateOne({
    _id: new ObjectID("5ea682dcccbd510e748ca87d")
  },
    {
      $inc: {
        age: 1
      }
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
});
