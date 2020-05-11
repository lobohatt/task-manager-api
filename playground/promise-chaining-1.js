require('../src/db/mongoosemain.js');

const Task = require('../src/models/task.js');

Task.findByIdAndDelete('5eabfbaf4dc9cd697cb2575f').then((task) => {
  console.log(task);
  return Task.countDocuments({ completed: false });
}).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e);
});

const deletetaskbyid = async (id) => {

  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deletetaskbyid('5ead7228462b2d5a642c50fc').then((no) => {
  console.log(no);
}).catch((e) => {
  console.log(e);
});