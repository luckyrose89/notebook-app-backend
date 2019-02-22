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

notebookRoute.post("/", (req, res) => {
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

notebookRoute.get("/:id", (req, res) => {
  Notebook.findById(req.params.id, (err, book) => {
    if (err) {
      res.send("Cannot fetch the selected entry at the moment!!");
    } else {
      res.json(book);
    }
  });
});

notebookRoute.post("/:id", (req, res) => {
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

notebookRoute.delete("/:id", (req, res) => {
  Notebook.findOneAndDelete({ _id: req.params.id }, (err, book) => {
    if (err) return res.json(err);
    return res.json(book);
  });
});

// Notepage CRUD routes

notebookRoute.post("/addpage/:id", (req, res) => {
  Notebook.findById(req.params.id, (err, book) => {
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
        console.log(err);
      });
  });
});

notebookRoute.get("/edit/:id/:note", (req, res) => {
  let bookId = req.params.id;
  let noteId = req.params.note;

  Notebook.findById(bookId, (err, book) => {
    let result = book.notes.id(noteId);
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

notebookRoute.post("/edit/:id/:note", (req, res) => {
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
        res.json("Database Updated!");
      })
      .catch(err => {
        res.status(400).send("Unable to update the database");
      });
  });
});

notebookRoute.get("/delete/:id/:note", (req, res) => {
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
