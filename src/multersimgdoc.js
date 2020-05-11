//REST API // POST GET PATCH DELETE // Refactoring

const express = require('express');
require('./db/mongoosemain.js');
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');

const app = express();

const port = process.env.PORT || 3000

const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000                       // file size limit // 1 MB
  },
  fileFilter(req, file, cb) {

    // if (!file.originalname.endsWith('.pdf')) 
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    }

    cb(undefined, true)
  }
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
});




app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
  console.log('server up on port ' + port);
});



/*--------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/

//REST API // POST GET PATCH DELETE // Refactoring

const express = require('express');
require('./db/mongoosemain.js');
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');

const app = express();

const port = process.env.PORT || 3000

const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000                       // file size limit // 1 MB
  },
  fileFilter(req, file, cb) {

    // if (!file.originalname.endsWith('.pdf')) 
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    }

    cb(undefined, true)
  }
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});




app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
  console.log('server up on port ' + port);
});






