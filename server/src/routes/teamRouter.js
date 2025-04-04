const { Router } = require("express");
const { getDriversTeamsHandler } = require("../handlers/teamHandler");

const teamRouter = Router();

teamRouter.get("/", getDriversTeamsHandler);

module.exports = teamRouter;
