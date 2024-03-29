//REST API // POST GET PATCH DELETE

const express = require('express');
require('./db/mongoosemain.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');
const validators = require('validator');


const app = express();

const port = process.env.PORT || 3000

app.use(express.json());


//--------------------------*****----------------------------//

app.post('/users', async (req, res) => {

  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

});



app.get('/users', async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send()
  }

});

app.get('/users/:id', async (req, res) => {

  const _id = req.params.id;

  try {
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }

});


app.patch('/users/:id', async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['age', 'name', 'email', 'password'];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }


});

app.delete('/users/:id', async (req, res) => {


  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }


});










//------------------***********-------------------//

app.post('/tasks', async (req, res) => {

  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e)
  }

});

app.get('/tasks', async (req, res) => {

  try {
    const task = await Task.find({});
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

});


app.get('/tasks/:id', async (req, res) => {

  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(400).send()
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }

});

app.patch('/tasks/:id', async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' });
  }

  try {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      res.status(404).send()
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

app.delete('/tasks/:id', async (req, res) => {

  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send(task);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
});




//------------------************--------------------//




app.listen(port, () => {
  console.log('server up on port ' + port);
});



/*---------------------------------------*/

const router = new express.Router();

router.get('/test', (req, res) => {
  res.send('This is from my other router');
});

app.use(router);