const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const viewsRoutes = require("./routes/viewsRoutes");
const globalErrorHandling = require("./controllers/errorController");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const server = require("./server");

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// SET ENVIRONMMENT VARIABLES PATH
dotenv.config({ path: "./.env" });

// USE PUG TEMPLATE ENGINE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//// A) Set security HTTP Headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdn.jsdelivr.net"], // Allow scripts from self and cdn.jsdelivr.net
    },
  })
);

// PARSE USER INPUTS
app.use(express.json());
app.use(cookieParser());

// USER API's
app.use("/api/v1/users", userRoutes);
app.use("/", viewsRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Invalid route: ${req.originalUrl}`, 400));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandling);

// HANDLE UNHANDLED REJECTIONS
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err}`);
  server.close(() => {
    console.error("Shutting Down");
    process.exit(1);
  });
});

module.exports = app;
