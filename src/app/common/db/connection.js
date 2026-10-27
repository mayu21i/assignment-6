const { MongoClient } = require("mongodb");
const dbConfig = require("../../config/db.config");

const client = new MongoClient(dbConfig.mongoUri);

let database;

async function connectToDatabase() {
  if (!database) {
    await client.connect();
    database = client.db(dbConfig.databaseName);
    console.log(`Connected to MongoDB database: ${dbConfig.databaseName}`);
  }

  return database;
}

function getDatabase() {
  if (!database) {
    throw new Error("Database is not connected. Call connectToDatabase() first.");
  }

  return database;
}

module.exports = {
  connectToDatabase,
  getDatabase,
};
