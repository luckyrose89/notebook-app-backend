const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let flashcards = new Schema({
  front: { type: String, required: true },
  back: { type: String, required: true }
});

let notebookSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  notes: [{ type: Schema.Types.ObjectId, ref: "notepage" }],
  flashcards: [flashcards]
});

module.exports = mongoose.model("notebook", notebookSchema);
