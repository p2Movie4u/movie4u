const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const user_data = require("./user_data");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);

mongoose.connect(process.env.dbURL).then(() => {
  console.log(`Conected to db ${process.env.dbURL}`);

  mongoose.connection.db.dropCollection("users").then(() => {
    console.log("Collection deleted");

    user_data.forEach(e => {

      const hashPass = bcrypt.hashSync(e.password, salt);

      let user = new User({
        username: e.username,
        password: hashPass,
        email: e.email,
        photo: e.photo
      })
        .save()
        .then(() => {
          console.log("User created");
          mongoose.disconnect();
        });
    });
  });
});