const Compte = require("./../models/compte");
const Problem = require("./../models/problem");
const Demand = require("./../models/demand");
const Archive = require("./../models/archive");
const asyncHandler = require("express-async-handler");

exports.getSignup = (req, res) => {
  res.status(200).render("signup");
};

exports.getLogin = (req, res) => {
  res.status(200).render("login");
};

exports.getBase = (req, res) => {
  res.status(200).render("base");
};

exports.getMain = (req, res) => {
  res.status(200).render("main");
};

exports.getAdminDashboard = (req, res) => {
  res.status(200).render("adminDashboard");
};

exports.getManageUsers = (req, res) => {
  res.status(200).render("manageUsers");
};

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await Compte.find({
    typedecompte: { $in: ["etudiant", "enseignant"] },
    status: "accepted",
  }).populate("utilisateur");
  res.status(200).render("allUsers", {
    users,
  });
});

exports.getPendingUsers = asyncHandler(async (req, res) => {
  const pendingUsers = await Compte.find({
    typedecompte: { $in: ["etudiant", "enseignant"] },
    status: "pending",
  }).populate("utilisateur");
  res.status(200).render("pendingUsers", {
    pendingUsers,
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await Compte.findOne({ _id: req.params.id }).populate(
    "utilisateur"
  );
  const typeOfList = req.params.typeOfList;
  res.status(200).render("getUser", { user, typeOfList });
});

// GET ALL PROBLEMS
exports.getProblemsForAdmin = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ status: "Pending" }).populate(
    "utilisateur"
  );
  res.status(200).render("problems", {
    problems,
  });
});

// GET A SINGLE PROBLEM
exports.getOneProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.problemId).populate(
    "utilisateur"
  );
  res.status(200).render("getProblem", { problem });
});

// USERS ROLES
// USER DASHBOARD
exports.getUserDashboard = asyncHandler(async (req, res) => {
  let { typedecompte } = await Compte.findOne(
    { _id: req.user._id },
    { typedecompte: 1 }
  );
  const { utilisateur } = await Compte.findById(req.user._id).populate(
    "utilisateur"
  );
  res.status(200).render("userDashboard", {
    typedecompte,
    utilisateur,
  });
});

// PROBLEMS
exports.getProblemsPageForUser = (req, res) => {
  res.status(200).render("userProblemsPage");
};

exports.getReportProblem = (req, res) => {
  res.status(200).render("reportProblem");
};

exports.getProblemsMadeByUser = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const compte = await Compte.find({ _id: userID }).populate("utilisateur");
  const utilisateurID = await compte[0].utilisateur._id;
  const userProblems = await Problem.find({ utilisateur: utilisateurID });
  res.status(200).render("problemsMadeByUser", { userProblems });
});

// DEMANDS
exports.getManageDemands = (req, res) => {
  res.status(200).render("manageDemands");
};

exports.getArchiveDemands = asyncHandler(async (req, res) => {
  const archiveDemands = await Demand.find({
    type: "archive",
    status: "Pending",
  })
    .populate("utilisateur")
    .populate("document");
  res.status(200).render("archiveDemands", {
    archiveDemands,
  });
});

exports.getOneDemand = asyncHandler(async (req, res) => {
  const demand = await Demand.findOne({ _id: req.params.id })
    .populate("utilisateur")
    .populate("document");
  console.log(demand);
  res.status(200).render("getDemand", { demand });
});

exports.getAdministratifDemands = asyncHandler(async (req, res) => {
  const administratifDemands = await Demand.find({
    type: "administratif",
    status: "Pending",
  })
    .populate("utilisateur")
    .populate("document");
  res.status(200).render("administratifDemands", {
    administratifDemands,
  });
});

exports.getDemandsPageUser = (req, res) => {
  res.status(200).render("demandsPageUser");
};

exports.getSentDemandsByUser = asyncHandler(async (req, res) => {
  let { typedecompte } = await Compte.findOne(
    { _id: req.user._id },
    { typedecompte: 1 }
  );
  const demands = await Demand.find({ utilisateur: req.user._id })
    .populate("utilisateur")
    .populate("document");
  res.status(200).render("sentDemandsByUser", {
    demands,
    typedecompte,
  });
});

exports.getSendNewDemandByUser = asyncHandler(async (req, res) => {
  let { typedecompte } = await Compte.findOne(
    { _id: req.user._id },
    { typedecompte: 1 }
  );
  res.status(200).render("sendDemandByUser", { typedecompte });
});

exports.getDemandArchiveDocument = (req, res) => {
  res.status(200).render("demandArchiveDocument");
};

exports.getDemandAdministratifDocumentEns = (req, res) => {
  res.status(200).render("demandAdministratifDocumentEns");
};

exports.getDiplomePage = (req, res) => {
  res.status(200).render("getDiplomPage");
};

exports.getAffectationPage = (req, res) => {
  res.status(200).render("getAffectationPage");
};

exports.getCertificatPage = (req, res) => {
  res.status(200).render("getCertificatScolairePage");
};

exports.getCertDeBonMoralite = (req, res) => {
  res.status(200).render("getCertDeBonMoralite");
};

exports.getAcceptedDocument = asyncHandler(async (req, res) => {
  const { photo } = await Demand.findById(req.params.id);
  res.status(200).render("getAcceptedDocument", {
    photo,
  });
});

// ARCHIVES
// 0
exports.manageArchives = (req, res) => {
  res.status(200).render("manageArchives");
};
// 1
exports.etudeArchivesTypes = (req, res) => {
  res.status(200).render("etudeArchivesTypes");
};
exports.administratifArchivesTypes = (req, res) => {
  res.status(200).render("administratifArchivesTypes");
};
// 2
exports.getArchives = asyncHandler(async (req, res) => {
  const archives = await Archive.find({
    typededocument: req.params.type,
  }).populate("document");
  let typededocument;
  if (archives.length > 0) {
    typededocument = archives[0].typededocument;
  }
  res.status(200).render("getArchives", { archives, typededocument });
});
// 3
exports.getOneArchive = asyncHandler(async (req, res) => {
  const archive = await Archive.findById(req.params.id).populate("document");
  res.status(200).render("getOneArchive", { archive });
});

exports.getSearchDocument = (req, res) => {
  res.status(200).render("searchDocument");
};

exports.getDocument = asyncHandler(async (req, res) => {
  const demand = await Demand.findById(req.params.id);
  const documentPhoto = demand.photo;
  console.log(documentPhoto);
  res.status(200).render("getDocument", { documentPhoto });
});

exports.getSearchProf = (req, res) => {
  res.status(200).render("searchProf");
};

exports.getProf = async (req, res) => {
  const prof = await Compte.findById(req.params.id).populate("utilisateur");
  res.status(200).render("getProf", { prof });
};
