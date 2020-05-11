// Authentication

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





const bcrypt = require('bcryptjs');

const myFunction = async () => {

  const password = 'qazwsxcderfv!';
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare('Red1234', hashedPassword)
  console.log(isMatch);

};

myFunction();



