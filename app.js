const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog.7hdbewe.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set(express.static("public"));

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
