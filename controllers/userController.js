const asyncHandler = require("express-async-handler");
const Compte = require("./../models/compte");
const Utilisateur = require("./../models/utilisateur");

// GET ALL USERS
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await Compte.find().populate("utilisateur");
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

// DELETE ALL USERS
exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
  await Compte.deleteMany();
  await Utilisateur.deleteMany();
  res.status(204).json({
    status: "success",
    message: "Users are deleted successfuly",
  });
});

// DELETE A USER
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await Compte.findOne({ _id: req.params.id }).populate(
    "utilisateur"
  );
  await Compte.findByIdAndDelete({ _id: user._id });
  await Utilisateur.findByIdAndDelete({ _id: user.utilisateur._id });
  res.status(204).json({
    status: "success",
    messgae: "user has been delete successfuly",
  });
});

// ACCEPT THE USER BY THE ADMIN
exports.acceptUser = asyncHandler(async (req, res, next) => {
  const user = await Compte.findOne({ _id: req.params.userId });
  user.status = "accepted";
  await user.save();
  res.status(200).json({
    status: "success",
    message: "User has been accepted",
    user,
  });
});
