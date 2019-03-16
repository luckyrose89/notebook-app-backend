"use strict";

const Notebook = require("../models/notebook.model");

// Notebook control functions
// Get all notebooks
const getAll = async (req, res, next) => {
  try {
    const notebooks = await Notebook.find();
    return res.status(200).json(notebooks);
  } catch (err) {
    return next(err);
  }
};

// Create a Notebook
const create = async (req, res, next) => {
  const notebook = new Notebook(req.body);
  try {
    const newNotebook = await notebook.save();
    return res.status(200).json(newNotebook);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

// Get a specific notebook
const getOne = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.bookId });
    return res.status(200).json(notebook);
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

// Update a specific notebook
const updateOne = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.bookId });
    notebook.title = req.body.title;
    const updatedNotebook = await notebook.save();
    return res.status(200).json(updatedNotebook);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

// Delete a specific notebook
const deleteOne = async (req, res, next) => {
  try {
    const deleteNotebook = await Notebook.findOneAndDelete({
      _id: req.params.bookId
    });
    return res.status(200).json(deleteNotebook);
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

// Notepage CRUD Routes
// Create a notepage
const createNotepage = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.bookId });
    notebook.notes = notebook.notes.concat({
      title: req.body.title,
      questionAnswer: req.body.questionAnswer,
      summary: req.body.summary
    });
    const updateNotebook = await notebook.save();
    return res.status(200).json(updateNotebook);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

// Get a notepage
const getNotepage = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.bookId });
    const notepage = notebook.notes.id(req.params.noteId);
    if (notepage === null) {
      throw new Error("The requested notepage does not exist");
    }
    return res.status(200).json(notepage);
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

// Update a Notepage
const updateNotepage = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.bookId });
    const notepage = notebook.notes.id(req.params.noteId);
    notepage.title = req.body.title;
    notepage.summary = req.body.summary;
    notepage.questionAnswer = req.body.questionAnswer;

    return notebook
      .save()
      .then(response => res.json(notebook))
      .catch(err => next(err));
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

// delete a notepage
const deleteNotepage = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.bookId });
    notebook.notes.id(req.params.noteId).remove();
    const updateNotebook = await notebook.save();
    return res.status(200).json(updateNotebook);
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

exports = module.exports = {
  getAll,
  create,
  getOne,
  updateOne,
  deleteOne,
  createNotepage,
  getNotepage,
  updateNotepage,
  deleteNotepage
};
