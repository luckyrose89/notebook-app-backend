const express = require("express");
const notebookRoute = express.Router();

let Notebook = require("../models/notebook.model");

// Get all notebooks
notebookRoute.get("/", (req, res) => {
  Notebook.find((err, notebookData) => {
    if (err) {
      res.status(404);
      err.message = "An error occured while fetching db: ";
      next(err);
    } else {
      res.json(notebookData);
    }
  });
});

// Notebook CRUD routes

notebookRoute.post("/", (req, res, next) => {
  let notebook = new Notebook(req.body);
  notebook
    .save()
    .then(notebook => {
      res.status(200).json({ notebook: "notebook added successfully" });
    })
    .catch(err => {
      res.status(500);
      err.message = "You must include a notebook title!";
      next(err);
    });
});

notebookRoute.get("/:id", (req, res, next) => {
  Notebook.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(400);
      err.message = "Cannot fetch the requested book at the moment.";
      next(err);
    } else {
      res.json(book);
    }
  });
});

notebookRoute.post("/:id", (req, res, next) => {
  Notebook.findById(req.params.id, (err, book) => {
    if (!book) {
      res.status(404);
      errMessage = new Error("Requested book not found");
      next(errMessage);
    } else {
      book.title = req.body.title;
      book
        .save()
        .then(book => {
          res.json("Database Updated!");
        })
        .catch(err => {
          res.status(500);
          err.message = "Please enter a title before submission";
          next(err);
        });
    }
  });
});

notebookRoute.delete("/:id", (req, res, next) => {
  Notebook.findOneAndDelete({ _id: req.params.id }, (err, book) => {
    if (err) {
      res.status(404);
      err.message = "Cannot find the requested book.";
      next(err);
    } else {
      return res.json(book);
    }
  });
});

// Notepage CRUD routes

notebookRoute.post("/add/:id", (req, res, next) => {
  Notebook.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(400);
      err.message = "Cannot add page to requested book";
      next(err);
    } else {
      const { title, questionAnswer, summary } = req.body;
      book.notes = book.notes.concat({
        title: title,
        questionAnswer: questionAnswer,
        summary: summary
      });
      book
        .save()
        .then(data => {
          res.json(book);
        })
        .catch(err => {
          res.status(500);
          err.message = "Please enter all fields before submission";
          next(err);
        });
    }
  });
});

// Bug in edit feature

notebookRoute.get("/edit/:id/:note", (req, res, next) => {
  let bookId = req.params.id;
  let noteId = req.params.note;

  Notebook.findById(bookId, (err, book) => {
    let result = book.notes.id(noteId);
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

notebookRoute.post("/edit/:id/:note", (req, res, next) => {
  let bookId = req.params.id;
  let noteId = req.params.note;
  Notebook.findById(bookId, (err, book) => {
    let result = book.notes.id(noteId);
    result.title = req.body.title;
    result.summary = req.body.summary;
    result.questionAnswer = req.body.questionAnswer;
    book
      .save()
      .then(book => {
        res.json(book);
      })
      .catch(err => {
        res.status(400).send("Unable to update the database");
      });
  });
});

notebookRoute.get("/delete/:id/:note", (req, res, next) => {
  let bookId = req.params.id;
  let noteId = req.params.note;
  Notebook.findById(bookId, (err, book) => {
    book.notes.id(noteId).remove();
    book
      .save()
      .then(data => {
        res.json(book);
        console.log(book);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

module.exports = notebookRoute;
