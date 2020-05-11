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



const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  //const task = await Task.findById('5eb41e27e4561c473c661b84');
  //await task.populate('owner').execPopulate();
  //console.log(task);
  //console.log(task.owner);

  const user = await User.findById('5eb41dc9e4561c473c661b81');
  await user.populate('tasks').execPopulate();
  //console.log(user);
  console.log(user.tasks);
}

main()



