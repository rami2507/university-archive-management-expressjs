const asyncHandler = require("express-async-handler");
const Problem = require("./../models/problem");
const Compte = require("./../models/compte");
// GET ALL PROBLEMS (Pending)
exports.getAllProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ status: "Pending" }).populate(
    "utilisateur"
  );
  res.status(200).json({
    status: "success",
    results: problems.length,
    data: { problems },
  });
});

// DELETE ALL PROBLEMS
exports.deleteAllProblems = asyncHandler(async (req, res) => {
  await Problem.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// DELETE A PROBLEM
exports.deleteProblem = asyncHandler(async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// SEND A PROBLEM
exports.sendProblem = asyncHandler(async (req, res) => {
  let date = new Date();
  date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const user = await Compte.findOne({ _id: req.user._id }).populate(
    "utilisateur"
  );
  const problem = {
    date,
    type: req.body.type,
    message: req.body.message,
    utilisateur: user.utilisateur._id,
  };
  const createdProblem = await Problem.create(problem);
  res.status(201).json({
    status: "success",
    data: { problem: createdProblem },
  });
});

// RESOLVE A PROBLEM
exports.resolveProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.problemId);
  problem.status = "Resolved";
  await problem.save();
  res.status(200).json({
    status: "success",
    message: "The problem has been solved successfuly",
    problem,
  });
});

// UNRESOLVE A PROBLEM
exports.unresolveProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.problemId);
  problem.status = "Unresolved";
  await problem.save();
  res.status(200).json({
    status: "success",
    message: "The problem has been Unresolved",
    problem,
  });
});
