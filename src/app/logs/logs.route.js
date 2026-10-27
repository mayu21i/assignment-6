const express = require("express");
const logsController = require("./logs.controller");

const logsRouter = express.Router();

logsRouter.post("/logs", logsController.createLog);
logsRouter.get("/books/aggregate4", logsController.aggregateLogsWithBookDetails);

module.exports = logsRouter;
