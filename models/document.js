const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  nommatiere: { type: String },
  specialite: { type: String },
  annee: { type: String },
  matricule: Number,
  grade: String,
  photo: String,
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
