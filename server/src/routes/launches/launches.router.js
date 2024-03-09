const { getAllLaunches } = require("./launches.controller");

const launchesRouter = require("express").Router();

launchesRouter.route("/").get(getAllLaunches);

module.exports = launchesRouter;
