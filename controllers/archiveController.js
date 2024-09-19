const asyncHandler = require("express-async-handler");
const Archive = require("./../models/archive");
const Document = require("./../models/document");

exports.getAllArchives = asyncHandler(async (req, res) => {
  const archives = await Archive.find().populate("document");
  res.status(200).json({
    status: "success",
    results: archives.length,
    data: {
      archives,
    },
  });
});

exports.deleteAllArchives = asyncHandler(async (req, res) => {
  await Archive.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createArchive = asyncHandler(async (req, res) => {
  // CREATE DOCUMENT
  let document = req.body;
  document.photo = req.file.filename;
  document = await Document.create(req.body);

  // CREATE ARCHIVE
  const archive = {
    typededocument: req.body.typededocument,
    document,
  };
  const newArchive = await Archive.create(archive);
  res.status(200).json({
    status: "success",
    message: "Document archived",

    data: { newArchive },
  });
});

exports.deleteArchive = asyncHandler(async (req, res) => {
  await Archive.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
