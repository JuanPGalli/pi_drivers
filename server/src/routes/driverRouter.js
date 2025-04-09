const { Router } = require("express");
const {
  getDriversHandler,
  getDriverIdHandler,
  postDriverHandler,
  deleteDriverHandler,
  updateDriverHandler,
} = require("../handlers/driverHandler");

const driverRouter = Router();

// query
driverRouter.get("/", getDriversHandler);

// params
driverRouter.get("/:id", getDriverIdHandler);

// body
driverRouter.post("/", postDriverHandler);

// params
driverRouter.delete("/:id", deleteDriverHandler);

//params
driverRouter.put("/:id", updateDriverHandler);

module.exports = driverRouter;
