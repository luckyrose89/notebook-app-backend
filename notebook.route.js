const express = require("express");
const notebookRoute = express.Router();

// let notebook = require('./notebook.model');

//Define Routes for Notebook
notebookRoute.get("/viewbooks", (req, res) => {
  res.send("GET WORKS!!");
});

notebookRoute.post("/createbook", (req, res) => {
  res.send("POST WORKS!!");
});

notebookRoute.post("/updatebook", (req, res) => {
  res.send("UPDATE WORKS");
});

notebookRoute.delete("/deletebook", (req, res) => {
  res.send("DELETE WORKS");
});

module.exports = notebookRoute;
