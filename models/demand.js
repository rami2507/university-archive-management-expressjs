const mongoose = require("mongoose");

const demandSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["archive", "administratif"],
    required: true,
  },
  typeDeDocument: String,
  status: {
    type: String,
    default: "Pending",
    enum: ["Declined", "Pending", "Accepted"],
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Compte",
    required: true,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  photo: String,
});

const Demand = mongoose.model("Demand", demandSchema);

module.exports = Demand;
