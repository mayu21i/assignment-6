const { getDatabase } = require("../common/db/connection");

async function createLog(logData) {
  return getDatabase().collection("logs").insertOne(logData);
}

// Q19: Join log records to books, converting the sample string book_id to ObjectId.
async function aggregateLogsWithBookDetails() {
  return getDatabase()
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          let: {
            bookObjectId: {
              $convert: {
                input: "$book_id",
                to: "objectId",
                onError: null,
                onNull: null,
              },
            },
          },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$bookObjectId"] } } },
            { $project: { _id: 0, title: 1, author: 1, year: 1 } },
          ],
          as: "book_details",
        },
      },
      { $project: { _id: 0, action: 1, book_details: 1 } },
    ])
    .toArray();
}

module.exports = {
  createLog,
  aggregateLogsWithBookDetails,
};
