const express = require("express");
const booksController = require("./books.controller");

const booksRouter = express.Router();

// Q5-Q18: Book operations from the assignment.
booksRouter.post("/books", booksController.createBook);
booksRouter.post("/books/batch", booksController.createBooksBatch);
booksRouter.patch("/books/:title", booksController.updateFutureBookYear);
booksRouter.get("/books/title", booksController.findBookByTitle);
booksRouter.get("/books/year", booksController.findBooksByYearRange);
booksRouter.get("/books/genre", booksController.findBooksByGenre);
booksRouter.get("/books/skip-limit", booksController.findBooksWithSkipAndLimit);
booksRouter.get("/books/year-integer", booksController.findBooksWithIntegerYear);
booksRouter.get("/books/exclude-genres", booksController.findBooksExcludingGenres);
booksRouter.delete("/books/before-year", booksController.deleteBooksBeforeYear);
booksRouter.get("/books/aggregate1", booksController.aggregateBooksAfter2000Sorted);
booksRouter.get("/books/aggregate2", booksController.aggregateBookSummaryAfter2000);
booksRouter.get("/books/aggregate3", booksController.aggregateBooksByGenre);

module.exports = booksRouter;
