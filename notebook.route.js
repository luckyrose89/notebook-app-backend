const express = require("express");
const notebookRoute = express.Router();

let Notebook = require("./notebook.model");

//Define Routes for Notebook
notebookRoute.get("/", (req, res) => {
  Notebook.find((err, notebookData) => {
    if (err) {
      console.log("An error occured while fetching db: ", err);
    } else {
      res.json(notebookData);
    }
  });
});

notebookRoute.post("/add", (req, res) => {
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

notebookRoute.post("/edit", (req, res) => {
  res.send("UPDATE WORKS");
});

notebookRoute.delete("/delete/:id", (req, res) => {
  Notebook.findByIdAndRemove({ _id: req.params.id }, (err, book) => {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = notebookRoute;
