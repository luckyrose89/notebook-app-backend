// server.js for the app

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3001;
const cors = require("cors");
const notebookRoute = require("./notebook.route");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/notebook", notebookRoute);

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
