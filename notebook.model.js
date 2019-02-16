const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let flashcards = new Schema({
  front: { type: String, required: true },
  back: { type: String, required: true }
});

let notePage = new Schema({
  title: { type: String, required: true },
  questionAnswer: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],
  summary: { type: String, required: true }
});

let notebookSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  notes: [notePage],
  flashcards: [flashcards]
});

module.exports = mongoose.model("notebook", notebookSchema);
