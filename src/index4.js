//REST API // POST GET PATCH DELETE // Refactoring

const express = require('express');
require('./db/mongoosemain.js');
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');

const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
  console.log('server up on port ' + port);
});





const jwt = require('jsonwebtoken');

const myFunction = async () => {

  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse');
  console.log(token);

  const data = jwt.verify(token, 'thisismynewcourse');
  console.log(data);
};

myFunction();



/*
const jwt = require('jsonwebtoken');

const myFunction = async () => {

  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
  console.log(token);

  const data = jwt.verify(token, 'thisismynewcourse');
  console.log(data);
};

myFunction();*/