const { User } = require("./models/User.model");
const bcrypt = require("bcrypt");
const { Role } = require("./constants/constansts");
const mongoose = require("./services/mongoose");

async function createSuperUser() {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("superadmin", salt);
  const newUser = await new User({
    role: Role.SUPERUSER,
    password,
    middleName: "admin",
    firstName: "admin",
    lastName: "admin",
    loginID: "admin",
  });
  await newUser.save();
  console.log('user one created')

  const password1 = await bcrypt.hash("promiseadmin", salt);
  const newUser1 = await new User({
    role: Role.SUPERUSER,
    password: password1,
    middleName: "promiseAdmin",
    firstName: "promiseAdmin",
    lastName: "promiseAdmin",
    loginID: "chiemelapromise30@gmail.com",
  });
  await newUser1.save();
  console.log('user two created')
}

async function main() {
  const db = mongoose.connection;
  db.on("error", () => {
    throw error;
  });

  try {
    await createSuperUser();
  } catch (error) {
    if (error.code != "11000") {
      throw error;
    }
  }
}

console.log("setup: bootstrapping project...");
main()
  .then(() => {
    console.log("setup: bootstrap sucessfull");
  })
  .catch((error) => {
    console.log("error: bootstrap failed", error);
  })
  .finally(() => {
    process.exit();
  });
