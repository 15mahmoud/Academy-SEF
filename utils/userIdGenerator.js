const { User } = require("../models/users/User");
function generateRandomUserId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

async function generateUniqueUserId() {
  let userId;
  let userExists = true;

  while (userExists) {
    userId = generateRandomUserId();

    userExists = await User.findOne({ userId });
  }

  return userId;
}
module.exports = generateUniqueUserId;
