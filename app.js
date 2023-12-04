const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog.7hdbewe.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const router = require("./routes/index");

const app = express();
const store = new MongoDBStore({
  uri: MONGO_DB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(router.homeRouter);

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
