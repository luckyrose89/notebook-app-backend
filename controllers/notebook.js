"use strict";

const Notebook = require("../models/notebook.model");

// Notebook control functions
// Get all notebooks
const getAll = async (req, res, next) => {
  try {
    const notebooks = await Notebook.find();
    res.status(200).json(notebooks);
  } catch (err) {
    return next(err);
  }
};

// Create a Notebook
const create = async (req, res, next) => {
  const notebook = new Notebook(req.body);
  try {
    const newNotebook = await notebook.save();
    res.status(200).json({ notebook: newNotebook });
  } catch (err) {
    return next(err);
  }
};

// Get a specific notebook
const getOne = async (req, res, next) => {
  try {
    const notebook = await Notebook.findById({ _id: req.params.id });
    res.status(200).json(notebook);
  } catch (err) {
    return next(err);
  }
};

// Update a specific notebook
const updateOne = async (req, res, next) => {
  try {
    const updatedNotebook = await Notebook.findById({ _id: req.params.id });
    updatedNotebook.title = req.body.title;
    updatedNotebook
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
    res.status(200).json(deleteNotebook);
  } catch (err) {
    return next(err);
  }
};
