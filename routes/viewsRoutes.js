const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/signup", viewsController.getSignup);
router.get("/login", viewsController.getLogin);
router.get("/base", viewsController.getBase);
router.get("/", viewsController.getMain);

// ADMIN ROLES
// ADMIN DASHBOARD
router.get("/adminDashboard", viewsController.getAdminDashboard);

router.use(authController.protect);
// MANAGE USERS BY ADMIN
router.get("/manage-users", viewsController.getManageUsers);
router.get("/manage-users/all-users", viewsController.getAllUsers);
router.get("/manage-users/pending-users", viewsController.getPendingUsers);
router.get("/manage-users/:typeOfList/:id", viewsController.getUser);

// MANAGE PROBLEMS BY ADMIN
router.get("/problems", viewsController.getProblemsForAdmin);
router.get("/problems/:problemId", viewsController.getOneProblem);

// MANAGE DEMANDS BY ADMIN
router.get("/manage-demands", viewsController.getManageDemands);
router.get("/manage-demands/archive", viewsController.getArchiveDemands);
router.get("/manage-demands/archive/:id", viewsController.getOneDemand);
router.get(
  "/manage-demands/administratif",
  viewsController.getAdministratifDemands
);
router.get("/manage-demands/administratif/:id", viewsController.getOneDemand);

// MANAGE ARCHIVES BY ADMIN
// 0
router.get("/manage-archives", viewsController.manageArchives);
// 1
router.get(
  "/manage-archives/etude-archives",
  viewsController.etudeArchivesTypes
);
router.get(
  "/manage-archives/administratif-archives",
  viewsController.administratifArchivesTypes
);
// 2
router.get(
  "/manage-archives/etude-archives/:type",
  viewsController.getArchives
);
router.get(
  "/manage-archives/administratif-archives/:type",
  viewsController.getArchives
);
// 3
router.get(
  "/manage-archives/etude-archives/:type/:id",
  viewsController.getOneArchive
);
router.get(
  "/manage-archives/administratif-archives/:type/:id",
  viewsController.getOneArchive
);

// USER ROLES
// PROBLEMS
router.get("/userDashboard", viewsController.getUserDashboard);
router.get("/problems-page", viewsController.getProblemsPageForUser);
router.get("/problems-page/report-problem", viewsController.getReportProblem);
router.get("/problems-page/my-problems", viewsController.getProblemsMadeByUser);

// DEMANDS
router.get("/user/demands", viewsController.getDemandsPageUser);
router.get("/user/demands/sent-demands", viewsController.getSentDemandsByUser);

// DOCUMENTS
router.get("/search-document", viewsController.getSearchDocument);
router.get("/search-document/:id", viewsController.getDocument);

// ENSEIGNAT
router.get(
  "/user/demands/send-new-demand/archive",
  viewsController.getDemandArchiveDocument
);

router.get(
  "/user/demands/send-new-demand/administratif",
  viewsController.getDemandAdministratifDocumentEns
);

router.get(
  "/user/demands/send-new-demand/administratif/affectation",
  viewsController.getAffectationPage
);

// ETUDIANT
router.get(
  "/user/demands/send-new-demand/administratif/diplome",
  viewsController.getDiplomePage
);
router.get(
  "/user/demands/send-new-demand/administratif/certificat-scolaire",
  viewsController.getCertificatPage
);

router.get(
  "/user/demands/send-new-demand/administratif/certificat-de-bon-moralite",
  viewsController.getCertDeBonMoralite
);
router.get(
  "/user/demands/send-new-demand",
  viewsController.getSendNewDemandByUser
);

router.get(
  "/user/demands/accepted-demands/:id",
  viewsController.getAcceptedDocument
);

router.get("/search-prof", viewsController.getSearchProf);
router.get("/search-prof/:id", viewsController.getProf);

module.exports = router;
