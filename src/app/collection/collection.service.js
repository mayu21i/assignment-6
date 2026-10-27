const collectionRepository = require("./collection.repository");

async function createBooksCollection() {
  return collectionRepository.createBooksCollection();
}

async function createAuthor(authorData) {
  if (!authorData || typeof authorData.name !== "string" || typeof authorData.nationality !== "string") {
    const error = new Error("Author name and nationality are required.");
    error.statusCode = 400;
    throw error;
  }

  return collectionRepository.createAuthor({
    name: authorData.name,
    nationality: authorData.nationality,
  });
}

async function createCappedLogsCollection() {
  return collectionRepository.createCappedLogsCollection();
}

async function createBooksTitleIndex() {
  return collectionRepository.createBooksTitleIndex();
}

module.exports = {
  createBooksCollection,
  createAuthor,
  createCappedLogsCollection,
  createBooksTitleIndex,
};
