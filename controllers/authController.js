const AppError = require("../utils/AppError");
const asyncHandler = require("express-async-handler");
const Compte = require("./../models/compte");
const Utilisateur = require("./../models/utilisateur");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signup = asyncHandler(async (req, res, next) => {
  // WORKING WITH UTILISATEUR
  const utilisateur = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    datedenaissance: req.body.datedenaissance,
    email: req.body.email,
    numerodetelephone: req.body.numerodetelephone,
  };
  const newUtilisateur = await Utilisateur.create(utilisateur);

  // WORKING WITH COMPTE

  let compte = {
    nomdutilisateur: req.body.nomdutilisateur,
    motdepass: req.body.motdepass,
    typedecompte: req.body.typedecompte,
    utilisateur: newUtilisateur._id,
  };

  compte.motdepass = await bcrypt.hash(compte.motdepass, 12);
  const newCompte = await Compte.create(compte);

  // SEND RESPONSE
  res.status(201).json({
    status: "success",
    data: {
      user: newCompte,
    },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { nomdutilisateur, motdepass } = req.body;
  if (!nomdutilisateur || !motdepass) {
    return next(new AppError("Please specify username and password", 404));
  }
  const user = await Compte.findOne({ nomdutilisateur });
  if (!user) {
    return next(new AppError("Can not find a user with that username", 404));
  }
  const passwordMatch = await bcrypt.compare(motdepass, user.motdepass);
  if (!passwordMatch) {
    return next(new AppError("username or password is not correct", 404));
  }
  // CHECK IF USER IS ACCEPTED BY THE ADMIN
  if (user.status === "pending" || user.status === "declined") {
    return next(
      new AppError("Your account is under review! please check back later")
    );
  }
  // SIGN TOKEN
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24d",
  });
  // SEND TOKEN AS A COOKIE
  res.cookie("jwt", token);
  // SEND RESPONSE TO CLIENT
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Getting Token And Check If It's There
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(
      new AppError("Your are not logged in! Please login to get access", 401)
    );
  // 2) Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check If User Still Exist
  const currentUser = await Compte.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token does no longer exist")
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// ONLY FOR RENDERED PAGES ,, NO ERRORS
exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  // 1) Getting Token And Check If It's There
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
    try {
      // 2) Validate token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      // 3) Check If User Still Exists
      const currentUser = await Compte.findById(decoded.userId).populate(
        "utilisateur"
      );
      if (!currentUser) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      res.locals.user = currentUser; // Optionally, store user data in locals
    } catch (err) {
      // Handle invalid or expired token
      console.error("Invalid or expired JWT token:", err);
    }
  }
  next();
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout");
  res.status(200).json({
    status: "success",
  });
};
