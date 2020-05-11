// Middleware

//REST API // POST GET PATCH DELETE // Refactoring

const express = require('express');
require('./db/mongoosemain.js');
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');

const app = express();

const port = process.env.PORT || 3000

//Middleware
app.use((req, res, next) => {
  res.status(503).send('Maintenance in Progress')
});




app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
  console.log('server up on port ' + port);
});


const pet = {
  name: 'Hal'
}

pet.toJSON = function () {
  console.log(this)
  return this
}

console.log(JSON.stringify(pet))







