const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');
const auth = require('../middleware/auth');




router.post('/tasks', auth, async (req, res) => {

  // const task = new Task(req.body);
  const task = new Task({

    ...req.body,
    owner: req.user._id

  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e)
  }

});

router.get('/tasks', auth, async (req, res) => {

  try {
    //const task = await Task.find({ owner: req.user._id }); // either this way or populate
    // tasks associated with users 
    await req.user.populate('tasks').execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

});


router.get('/tasks/:id', auth, async (req, res) => {

  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id); 

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(400).send()
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }

});

router.patch('/tasks/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' });
  }

  try {

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    //const task = await Task.findById(req.params.id);



    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.delete('/tasks/:id', auth, async (req, res) => {

  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
});



module.exports = router

/*------------------------------------------------------------------------------------------*/

const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');
const auth = require('../middleware/auth');




router.post('/tasks', auth, async (req, res) => {

  // const task = new Task(req.body);
  const task = new Task({

    ...req.body,
    owner: req.user._id

  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e)
  }

});


//GET /tasks?completed=true

router.get('/tasks', auth, async (req, res) => {

  try {
    //const task = await Task.find({ owner: req.user._id }); // either this way or populate
    // tasks associated with users 
    await req.user.populate({

      path: 'tasks',
      match: {
        completed: true
      }

    }).execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

});


router.get('/tasks/:id', auth, async (req, res) => {

  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id); 

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(400).send()
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }

});

router.patch('/tasks/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' });
  }

  try {

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    //const task = await Task.findById(req.params.id);



    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.delete('/tasks/:id', auth, async (req, res) => {

  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
});



module.exports = router

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');
const auth = require('../middleware/auth');




router.post('/tasks', auth, async (req, res) => {

  // const task = new Task(req.body);
  const task = new Task({

    ...req.body,
    owner: req.user._id

  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e)
  }

});


//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20               //skip10,skip20

router.get('/tasks', auth, async (req, res) => {

  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  try {
    //const task = await Task.find({ owner: req.user._id }); // either this way or populate
    // tasks associated with users 
    await req.user.populate({

      path: 'tasks',
      match: match

    }).execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

});


router.get('/tasks/:id', auth, async (req, res) => {

  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id); 

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(400).send()
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }

});

router.patch('/tasks/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' });
  }

  try {

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    //const task = await Task.findById(req.params.id);



    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.delete('/tasks/:id', auth, async (req, res) => {

  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
});



module.exports = router

/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/

const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');
const auth = require('../middleware/auth');




router.post('/tasks', auth, async (req, res) => {

  // const task = new Task(req.body);
  const task = new Task({

    ...req.body,
    owner: req.user._id

  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e)
  }

});


//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20               //skip10,skip20
//GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {

  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  try {
    //const task = await Task.find({ owner: req.user._id }); // either this way or populate
    // tasks associated with users 
    await req.user.populate({

      path: 'tasks',
      match: match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort: {
          //createdAt: -1     completed: 1
        }
      }

    }).execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

});


router.get('/tasks/:id', auth, async (req, res) => {

  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id); 

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(400).send()
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }

});

router.patch('/tasks/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' });
  }

  try {

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    //const task = await Task.findById(req.params.id);



    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.delete('/tasks/:id', auth, async (req, res) => {

  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
});



module.exports = router