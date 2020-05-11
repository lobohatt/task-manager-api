//REST API // POST GET PATCH DELETE // Without Async/await integration

const express = require('express');
require('./db/mongoosemain.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');


const app = express();

const port = process.env.PORT || 3000

app.use(express.json());   // parse in coming json so we can access it  


//------------------------*****----------------------------//

app.post('/users', (req, res) => {     // same as weather app // now we use post/update /get delete
  //console.log(req.body);

  const user = new User(req.body);

  user.save().then(() => {                        //Create
    res.status(201).send(user);
  }).catch((e) => {
    res.status(400).send(e);           // http status codes
    //res.send(e);
  });

  //res.send('testing!');

});



app.get('/users', (req, res) => {                  //Read

  User.find({}).then((users) => {
    res.send(users);                              // array of users to the respond
  }).catch((e) => {
    res.status(500).send();
  });

});

app.get('/users/:id', (req, res) => {
  //console.log(req.params);       model.findOne() // model.findById()

  const _id = req.params.id;

  User.findById(_id).then((user) => {

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((e) => {
    res.status(500).send();
  });

});


//------------------***********-------------------//

app.post('/tasks', (req, res) => {

  const task = new Task(req.body);

  task.save().then(() => {
    res.send(task);
  }).catch((e) => {
    res.status(400).send(e);
  })

});

app.get('/tasks', (req, res) => {

  Task.find({}).then((tasks) => {

    res.send(tasks);

  }).catch((e) => {
    res.status(500).send();
  });

});


app.get('/tasks/:id', (req, res) => {

  const _id = req.params.id;

  Task.findById(_id).then((task) => {
    if (!task) {
      return res.send(404).send();
    }
    res.send(task);
  }).catch(() => {
    res.status(500).send();
  });

});

//------------------************--------------------//




app.listen(port, () => {
  console.log('server up on port ' + port);
});