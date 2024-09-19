const mongoose = require("mongoose");

const compteSchema = new mongoose.Schema({
  nomdutilisateur: {
    type: String,
    required: true,
    unique: true,
  },
  motdepass: {
    type: String,
    required: true,
  },
  typedecompte: {
    type: String,
    enum: ["admin", "enseignant", "etudiant"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "declined"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
});

const Compte = mongoose.model("Compte", compteSchema);

module.exports = Compte;
