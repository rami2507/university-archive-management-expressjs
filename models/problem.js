const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Date must be specefied with your problem!"],
  },
  type: {
    type: String,
    required: [true, "Type must be specefied along with your problem!"],
  },
  message: {
    type: String,
    required: [true, " Message must be specefied along with your problem!"],
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Resolved", "Unresolved"],
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
