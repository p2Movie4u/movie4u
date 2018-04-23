const mongoose = require("mongoose");
const User = require("../models/User");
const user_data = require("./user_data");

const dbURL = "mongodb://localhost/movie4u";

mongoose.connect(dbURL).then(() => {
  console.log(`Conected to db ${dbURL}`);

  mongoose.connection.db.dropCollection("users").then(() => {
    console.log("Collection deleted");

    user_data.forEach(e => {
      let user = new User({
        username: e.username,
        password: e.password,
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