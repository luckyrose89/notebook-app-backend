const express = require("express");
const notebookRoute = express.Router();

let Notebook = require("./notebook.model");

// Get all notebooks
notebookRoute.get("/", (req, res) => {
  Notebook.find((err, notebookData) => {
    if (err) {
      console.log("An error occured while fetching db: ", err);
    } else {
      res.json(notebookData);
    }
  });
});

// Notebook CRUD routes

notebookRoute.get("/:id", (req, res) => {
  res.send("I work correctly");
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
  Notebook.findById(req.params.id, (err, book) => {
    if (!book) {
      res.status(404).send("Requested entry not found");
    } else {
      book.title = req.body.title;

      book
        .save()
        .then(book => {
          res.json("Database Updated!");
        })
        .catch(err => {
          res.status(400).send("Unable to update the database");
        });
    }
  });
});

notebookRoute.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Notebook.findOneAndDelete(id, err => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});

module.exports = notebookRoute;
