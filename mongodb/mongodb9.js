// Update // Promise without const


const { MongoClient, ObjectID } = require('mongodb');//MongoClient is property of mongodb & ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);

  db.collection('users').updateOne({
    _id: new ObjectID("5ea682dcccbd510e748ca87d")
  },
    {
      $set: {
        name: 'Benjamin'
      }
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
});
