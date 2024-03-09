const { httpGetAllLaunches } = require("./launches.controller");

const launchesRouter = require("express").Router();

launchesRouter.route("/").get(httpGetAllLaunches);

module.exports = launchesRouter;
