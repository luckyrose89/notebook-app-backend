const express = require("express");
const notebookRoute = express.Router();

let Notebook = require("./notebook.model");

//Define Routes for Notebook
notebookRoute.get("/notebooks", (req, res) => {
  res.send("GET WORKS!!");
});

notebookRoute.post("/notebooks/add", (req, res) => {
  let notebook = new Notebook(req.body);
  notebook
    .save()
    .then(notebook => {
      res.status(200).json({ notebook: "notebook added successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save to database!");
    });
});

notebookRoute.post("/notebooks/:id/edit", (req, res) => {
  res.send("UPDATE WORKS");
});

notebookRoute.delete("/notebooks/:id/delete", (req, res) => {
  res.send("DELETE WORKS");
});

module.exports = notebookRoute;
