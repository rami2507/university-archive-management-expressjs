const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const problemController = require("./../controllers/problemController");
const demandController = require("./../controllers/demandController");
const archiveController = require("./../controllers/archiveController");
const express = require("express");
const router = express.Router();

// SIGNUP
router.post("/signup", authController.signup);
// LOGIN
router.post("/login", authController.login);
// LOGOUT
router.post("/logout", authController.logout);

router.use(authController.protect);

// USERS
// GET ALL USERS
router.get("/allusers", userController.getAllUsers);
// DELETE ALL USERS
router.delete("/deleteAllUsers", userController.deleteAllUsers);
// DELETE A USER
router.delete("/deleteUser/:id", userController.deleteUser);
// ACCEPT A USER
router.patch("/acceptUser/:userId", userController.acceptUser);

// PROBLEMS
// GET ALL POROBLEMS
router.get("/getAllProblems", problemController.getAllProblems);
// DELETE ALL PROBLEMS
router.delete("/deleteAllProblems", problemController.deleteAllProblems);
// DELETE A PROBLEM
router.delete("/deleteProblem/:id", problemController.deleteProblem);
// SEND PROBLEM
router.post("/sendProblem", problemController.sendProblem);
// RESOLVE A PROBLEM
router.patch("/resolveProblem/:problemId", problemController.resolveProblem);
// UNRESOLVE A PROBLEM
router.patch(
  "/unresolveProblem/:problemId",
  problemController.unresolveProblem
);

// DEMANDS
// GET ALL DEMANDS
router.get("/alldemands", demandController.getAllDemands);
// DELETE ALL DEMANDS
router.delete("/deleteAllDemands", demandController.deleteAllDemands);
// SEND AN ARCHIVE DEMAND
router.post(
  "/sendDemand/archive/:nom",
  demandController.uploadDocument,
  demandController.sendDemandArchive
);
// SEND AN ADMINISTRATIF DEMAND
router.post(
  "/sendAdministratifDemand/:documenttype",
  demandController.uploadDocument,
  demandController.sendAdministratifDemand
);
// ACCEPT DEMAND
router.patch("/acceptDemand/:id", demandController.acceptDemand);
// DECLINE DEMAND
router.patch("/declineDemand/:id", demandController.declineDemand);

// ARCHIVES
// CREATE ARCHIVE
router.post(
  "/createArchive",
  demandController.uploadDocument,
  archiveController.createArchive
);
// GET ALL ARCHIVES
router.get("/archives", archiveController.getAllArchives);
// DELETE ALL ARCHIVES
router.delete("/deleteAllArchives", archiveController.deleteAllArchives);
// DELETE ONE ARCHIVE
router.delete("/deleteArchive/:id", archiveController.deleteArchive);

// DOCUMENTS
// SEARCH FOR DOCUMENT
router.post("/search-documents", demandController.searchDocuments);

// SEARCH FOR PROF
router.post("/search-prof", demandController.searchProf);

module.exports = router;
