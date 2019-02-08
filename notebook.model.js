const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionAnswer = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

let notePage = new Schema({
  title: { type: String, required: true },
  questionAnswerArray: [questionAnswer],
  summary: { type: String, required: true }
});

let notebookSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  notes: [notePage]
});

module.exports = mongoose.model("notebook", notebookSchema);
