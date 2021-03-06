// server.js for the app

require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3001;
const cors = require("cors");
const { notebookRouter } = require("./routers/index");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MLAB_URI, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database is now connected");
    },
    err => {
      console.log("Cannot connect to database + ", err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/notebook", notebookRouter);
app.use((err, req, res, next) => {
  console.error(err);
  return res.send({ error: err.message });
});

app.get("/", (req, res) => {
  res.send("Welcome to notebook API");
});
app.get("*", function(req, res) {
  res.status(404);
  res.send("Sorry the page you're looking for does not exist!");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
