const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const { ProfileRouter, JobRouter, AdminRouter } = require("./controller");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
 */

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/v1/profile", ProfileRouter);
app.use("/v1/jobs", JobRouter);
app.use("/v1/admin", AdminRouter);

app.get("/contracts/:id", getProfile, async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id } = req.params;
  const contract = await Contract.findOne({ where: { id } });
  if (!contract) return res.status(404).end();
  res.json(contract);
});

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

module.exports = app;
