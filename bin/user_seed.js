const mongoose = require("mongoose");
const User = require("../models/User");
const user_data = require("./user_data");

const dbURL = "mongodb://localhost/movie4u";

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);

mongoose.connect(dbURL).then(() => {
  console.log(`Conected to db ${dbURL}`);

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