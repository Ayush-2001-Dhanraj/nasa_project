const express = require("express");

const { getAllPlanets } = require("./planets.controller");

const planetRouter = express.Router();

planetRouter.route("/").get(getAllPlanets);

module.exports = planetRouter;
