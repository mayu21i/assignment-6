const collectionService = require("./collection.service");

// Q1: POST /collection/books
async function createBooksCollection(req, res, next) {
  try {
    const result = await collectionService.createBooksCollection();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q2: POST /collection/authors
async function createAuthor(req, res, next) {
  try {
    const result = await collectionService.createAuthor(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q3: POST /collection/logs/capped
async function createCappedLogsCollection(req, res, next) {
  try {
    const result = await collectionService.createCappedLogsCollection();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q4: POST /collection/books/index
async function createBooksTitleIndex(req, res, next) {
  try {
    const indexName = await collectionService.createBooksTitleIndex();
    return res.status(200).send(indexName);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createBooksCollection,
  createAuthor,
  createCappedLogsCollection,
  createBooksTitleIndex,
};
