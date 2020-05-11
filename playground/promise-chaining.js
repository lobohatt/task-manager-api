require('../src/db/mongoosemain.js');

const User = require('../src/models/user.js');

//find by id and update

/*User.findByIdAndUpdate('5eac0ea4b94cd62b64608c7f', { age: 1 }).then((user) => {
  console.log(user);
  return User.countDocuments({ age: 1 });
}).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e);
});*/


const UpdateAgeandCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

UpdateAgeandCount('5eac0ea4b94cd62b64608c7f', 2).then((count) => {
  console.log(count);
}).catch((e) => {
  console.log(e);
});

