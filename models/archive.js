const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  typededocument: String,
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
});

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
