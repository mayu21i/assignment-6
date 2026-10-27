const logsService = require("./logs.service");

// Q7: POST /logs
async function createLog(req, res, next) {
  try {
    const result = await logsService.createLog(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q19: GET /books/aggregate4
async function aggregateLogsWithBookDetails(req, res, next) {
  try {
    const result = await logsService.aggregateLogsWithBookDetails();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createLog,
  aggregateLogsWithBookDetails,
};
