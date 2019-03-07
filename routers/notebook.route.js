const express = require("express");
const notebookRouter = express.Router();

const { notebookCtrl } = require("../controllers/index");

// Notebook CRUD routes
notebookRouter.get("/", notebookCtrl.getAll);
notebookRouter.post("/", notebookCtrl.create);

notebookRouter.get("/:bookId", notebookCtrl.getOne);
notebookRouter.put("/:bookId", notebookCtrl.updateOne);
notebookRouter.delete("/:bookId", notebookCtrl.deleteOne);

// Notepage CRUD routes
notebookRouter.post("/add/:bookId", notebookCtrl.createNotepage);

notebookRouter.get("/:bookId/notes/:noteId", notebookCtrl.getNotepage);
notebookRouter.put("/:bookId/notes/:noteId", notebookCtrl.updateNotepage);
notebookRouter.delete("/:bookId/notes/:noteId", notebookCtrl.deleteNotepage);

module.exports = notebookRouter;
