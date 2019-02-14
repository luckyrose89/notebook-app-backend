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

notebookRoute.get("/edit/:id", (req, res) => {
  Notebook.findById(req.params.id, (err, book) => {
    if (err) {
      res.send("Cannot fetch the selected entry at the moment!!");
    } else {
      res.json(book);
    }
  });
});

notebookRoute.post("/update/:id", (req, res) => {
  res.send("Update works");
});

notebookRoute.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Notebook.findOneAndDelete(id, err => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});

module.exports = notebookRoute;
