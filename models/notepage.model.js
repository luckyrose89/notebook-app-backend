let notePage = new Schema({
  title: { type: String, required: true },
  questionAnswer: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],
  summary: { type: String, required: true },
  notebook: { type: Schema.Types.ObjectId, ref: "notebook" }
});

module.exports = mongoose.model("notepage", notepageSchema);
