const { getDatabase } = require("../common/db/connection");

async function createBooksCollection() {
  const db = getDatabase();
  const validator = {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          description: "title must be a non-empty string",
        },
      },
    },
  };

  const [existing] = await db.listCollections({ name: "books" }).toArray();

  if (existing) {
    // Keep the rule correct if the route is called again after initial creation.
    await db.command({
      collMod: "books",
      validator,
      validationLevel: "strict",
      validationAction: "error",
    });
    return { ok: 1 };
  }

  await db.createCollection("books", { validator });
  return { ok: 1 };
}

async function createAuthor(authorData) {
  const db = getDatabase();
  return db.collection("authors").insertOne(authorData);
}

async function createCappedLogsCollection() {
  const db = getDatabase();
  const [existing] = await db.listCollections({ name: "logs" }).toArray();

  if (existing) {
    if (existing.options?.capped) {
      return { ok: 1 };
    }
    throw new Error("The logs collection already exists and is not capped.");
  }

  await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });
  return { ok: 1 };
}

async function createBooksTitleIndex() {
  const db = getDatabase();
  return db.collection("books").createIndex({ title: 1 });
}

module.exports = {
  createBooksCollection,
  createAuthor,
  createCappedLogsCollection,
  createBooksTitleIndex,
};
