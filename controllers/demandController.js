const asyncHandler = require("express-async-handler");
const Demand = require("./../models/demand");
const Document = require("./../models/document");
const Archive = require("./../models/archive");
const Compte = require("./../models/compte");
const multer = require("multer");
const AppError = require("../utils/AppError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/documents");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `document-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

exports.uploadDocument = upload.single("photo");

// GET ALL DEMANDS (PENDING)
exports.getAllDemands = asyncHandler(async (req, res, next) => {
  const demands = await Demand.find({ status: "Pending" })
    .populate("utilisateur")
    .populate("document");
  console.log(demands);
  res.status(200).json({
    status: "success",
    results: demands.length,
    data: { demands },
  });
});

// DELETE ALL DEMANDS
exports.deleteAllDemands = asyncHandler(async (req, res) => {
  await Demand.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// SEND ARCHIVE DEMAND
exports.sendDemandArchive = asyncHandler(async (req, res) => {
  // Initialize demand object
  let demand = {};

  // Assign properties to demand
  demand.type = "archive";
  demand.typeDeDocument = req.params.nom;
  demand.utilisateur = req.user._id;
  try {
    // Create the document
    let document = req.body;
    document.photo = req.file.filename;
    document = await Document.create(document);

    // Associate document with demand
    demand.document = document._id;

    // Save demand
    await Demand.create(demand);

    // Send response
    res.status(201).json({
      status: "success",
      data: {
        demand,
        document,
      },
    });
  } catch (err) {
    // Handle errors
    console.error(err);
  }
});

// SEND ADMINISTRATIF DEMAND
exports.sendAdministratifDemand = asyncHandler(async (req, res) => {
  const documenttype = req.params.documenttype;

  let document = req.body;
  // document.photo = req.file.filename;
  document = await Document.create(document);

  let demand = {
    type: "administratif",
    typeDeDocument: documenttype,
    utilisateur: req.user._id,
  };

  demand.document = document._id;

  // SAVE DEMAND
  demand = await Demand.create(demand);

  res.status(201).json({
    status: "success",
    data: { demand },
  });
});

// ACCEPT DEMAND (SAVE TO ARCHIVE)
exports.acceptDemand = asyncHandler(async (req, res) => {
  try {
    const demand = await Demand.findById(req.params.id).populate("document");

    if (!demand) {
      return res.status(404).json({
        status: "error",
        message: "Demand not found.",
      });
    }

    if (demand.type === "archive") {
      // ACCEPT DEMAND
      demand.status = "Accepted";
      await demand.save();
      // SAVE TO ARCHIVE
      await Archive.create({
        typededocument: demand.typeDeDocument,
        document: demand.document,
      });
    } else {
      // Retrieve all archives
      const allArchives = await Archive.find().populate("document");

      // Check each archive for a matching document
      let isArchived = false;

      // SEARCH FOR DIPLOME
      if (demand.typeDeDocument === "diplome") {
        for (const archive of allArchives) {
          if (
            archive.document.nom === demand.document.nom &&
            archive.document.prenom === demand.document.prenom &&
            archive.document.specialite === demand.document.specialite
          ) {
            // Found a matching document in the archive
            isArchived = true;
            // DOCUMENT EXIST => ACCEPT IT AND PUT ITS PHOTO ALONG WITH THE DEMAND
            demand.status = "Accepted";
            demand.photo = archive.document.photo;
            await demand.save();
            break; // Exit the loop since we found a match
          }
        }
      } else if (
        demand.typeDeDocument === "certificat-scolaire" ||
        demand.typeDeDocument === "certificat-de-bon-moralite"
      ) {
        for (const archive of allArchives) {
          if (
            archive.document.nom === demand.document.nom &&
            archive.document.prenom === demand.document.prenom &&
            archive.document.specialite === demand.document.specialite &&
            archive.document.matricule === demand.document.matricule
          ) {
            // Found a matching document in the archive
            isArchived = true;
            // DOCUMENT EXIST => ACCEPT IT AND PUT ITS PHOTO ALONG WITH THE DEMAND
            demand.status = "Accepted";
            demand.photo = archive.document.photo;
            await demand.save();
            break; // Exit the loop since we found a match
          }
        }
      } else if (demand.typeDeDocument === "affectation") {
        for (const archive of allArchives) {
          if (
            archive.document.nom === demand.document.nom &&
            archive.document.prenom === demand.document.prenom &&
            archive.document.grade === demand.document.grade
          ) {
            // Found a matching document in the archive
            isArchived = true;
            // DOCUMENT EXIST => ACCEPT IT AND PUT ITS PHOTO ALONG WITH THE DEMAND
            demand.status = "Accepted";
            demand.photo = archive.document.photo;
            await demand.save();
            break; // Exit the loop since we found a match
          }
        }
      }

      // SEND RESPONSE
      if (isArchived) {
        return res.status(200).json({
          status: "success",
          message: "Document found and sent to the user!",
        });
      } else {
        demand.status = "Declined";
        await demand.save();
        return res.status(200).json({
          status: "error",
          message: "Document is not in our archive!",
        });
      }
    }

    // RESPONSE TO ARCHIVE DEMANDS (LI RAY7IN Y ARCHIVIW LES DOCUMENTS TA3HUM)
    res.status(200).json({
      status: "success",
      message: "Demand Accepted!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
      error: error.message,
    });
  }
});

// DECLINE DEMAND
exports.declineDemand = asyncHandler(async (req, res) => {
  const demand = await Demand.findById(req.params.id);
  demand.status = "Declined";
  await demand.save();
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    message: "Demand Declined!",
  });
});

// SEARCH FOR A DOCUMENT
exports.searchDocuments = asyncHandler(async (req, res, next) => {
  const searchData = req.body;
  let isArchived = {};
  const documentsAccepted = await Demand.find({
    utilisateur: req.user._id,
    status: "Accepted",
  })
    .populate("utilisateur")
    .populate("document");
  console.log(documentsAccepted);
  documentsAccepted.forEach((demand) => {
    if (
      demand.typeDeDocument === searchData.typededocument &&
      demand.document.nom === searchData.nom &&
      demand.document.prenom === searchData.prenom &&
      demand.document.specialite === searchData.specialite
    ) {
      isArchived = demand;
    }
  });
  if (Object.keys(isArchived).length === 0) {
    return next(new AppError("Document is not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Document Found",
    document: isArchived,
  });
});

// SEARCH FOR A PROF
exports.searchProf = asyncHandler(async (req, res, next) => {
  const nom = req.body.nom;
  let profAvailable = {};
  const allProfs = await Compte.find({ typedecompte: "enseignant" }).populate(
    "utilisateur"
  );
  allProfs.forEach((prof) => {
    if (prof.utilisateur.nom === nom) {
      profAvailable = prof;
    }
  });
  if (Object.keys(profAvailable).length === 0) {
    return next(new AppError("Prof is not found", 404));
  }
  res
    .status(200)
    .json({ status: "success", message: "Prof found", prof: profAvailable });
});
