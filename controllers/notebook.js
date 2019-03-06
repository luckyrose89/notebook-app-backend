"use strict";

const Notebook = require("../models/notebook.model");
const Notepage = require("../models/notepage.model");

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
    return res.status(200).json({ notebook: newNotebook });
  } catch (err) {
    return next(err);
  }
};

// Get a specific notebook
const getOne = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.id });
    return res.status(200).json(notebook);
  } catch (err) {
    return next(err);
  }
};

// Update a specific notebook
const updateOne = async (req, res, next) => {
  try {
    const updatedNotebook = await Notebook.findById({ _id: req.params.id });
    updatedNotebook.title = req.body.title;
    return updatedNotebook
      .save()
      .then(() => res.json({ message: "Database updated!" }));
  } catch (err) {
    return next(err);
  }
};

// Delete a specific notebook
const deleteOne = async (req, res, next) => {
  try {
    const deleteNotebook = await Notebook.findOneAndDelete({
      _id: req.params.id
    });
    return res.status(200).json(deleteNotebook);
  } catch (err) {
    return next(err);
  }
};

// Create a notepage
const createNotepage = async (req, res, next) => {};

// Get a notepage
const getNotepage = async (req, res, next) => {};

// Update a Notepage
const updateNotepage = async (req, res, next) => {};

// delete a notepage
const deleteNotepage = async (req, res, next) => {};

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
