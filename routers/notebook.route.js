const express = require("express");
const notebookRouter = express.Router();

const { notebookCtrl } = require("../controllers");

// Notebook CRUD routes
notebookRouter.get("/", notebookCtrl.getAll);
notebookRouter.post("/", notebookCtrl.create);

notebookRouter.get("/:bookId", notebookCtrl.getById);
notebookRouter.put("/:bookId", notebookCtrl.updateById);
notebookRouter.delete("/:bookId", notebookCtrl.deleteById);

// Notepage CRUD routes
notebookRouter.post("/add/:bookId", notebookCtrl.createNotepage);

notebookRouter.get("/:bookId/:noteId", notebookCtrl.getNotepage);
notebookRouter.post("/:id/:note", notebookCtrl.updateNotepage);
notebookRouter.get("/delete/:id/:note", notebookCtrl.deleteNotepage);

module.exports = notebookRoute;
