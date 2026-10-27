const express = require("express");
const collectionController = require("./collection.controller");

const collectionRouter = express.Router();

collectionRouter.post("/collection/books", collectionController.createBooksCollection);
collectionRouter.post("/collection/authors", collectionController.createAuthor);
collectionRouter.post("/collection/logs/capped", collectionController.createCappedLogsCollection);
collectionRouter.post("/collection/books/index", collectionController.createBooksTitleIndex);

module.exports = collectionRouter;
