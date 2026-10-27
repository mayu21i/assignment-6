const logsRepository = require("./logs.repository");

function makeError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createLog(data) {
  if (!data || typeof data.book_id !== "string" || !data.book_id.trim() || typeof data.action !== "string" || !data.action.trim()) {
    throw makeError("book_id and action are required.");
  }
  return logsRepository.createLog({ book_id: data.book_id, action: data.action });
}

async function aggregateLogsWithBookDetails() {
  return logsRepository.aggregateLogsWithBookDetails();
}

module.exports = {
  createLog,
  aggregateLogsWithBookDetails,
};
