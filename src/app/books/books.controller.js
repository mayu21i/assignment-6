const booksService = require("./books.service");

// Q5: POST /books
async function createBook(req, res, next) {
  try {
    const result = await booksService.createBook(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q6: POST /books/batch (request body is an array with at least three objects)
async function createBooksBatch(req, res, next) {
  try {
    const result = await booksService.createBooksBatch(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q8: PATCH /books/Future; assignment requires changing its year to 2022.
async function updateFutureBookYear(req, res, next) {
  try {
    const result = await booksService.updateBookYear(req.params.title, 2022);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q9: GET /books/title?title=...
async function findBookByTitle(req, res, next) {
  try {
    const book = await booksService.findBookByTitle(req.query.title);
    if (!book) return res.status(404).json({ message: "Book not found." });
    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

// Q10: GET /books/year?from=1990&to=2010
async function findBooksByYearRange(req, res, next) {
  try {
    const books = await booksService.findBooksByYearRange(req.query.from, req.query.to);
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

// Q11: GET /books/genre?genre=Science%20Fiction
async function findBooksByGenre(req, res, next) {
  try {
    const books = await booksService.findBooksByGenre(req.query.genre);
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

// Q12
async function findBooksWithSkipAndLimit(req, res, next) {
  try {
    return res.status(200).json(await booksService.findBooksWithSkipAndLimit());
  } catch (error) {
    return next(error);
  }
}

// Q13
async function findBooksWithIntegerYear(req, res, next) {
  try {
    return res.status(200).json(await booksService.findBooksWithIntegerYear());
  } catch (error) {
    return next(error);
  }
}

// Q14
async function findBooksExcludingGenres(req, res, next) {
  try {
    return res.status(200).json(await booksService.findBooksExcludingGenres());
  } catch (error) {
    return next(error);
  }
}

// Q15: The assignment's printed HTTP method says GET, but deleting records requires DELETE.
async function deleteBooksBeforeYear(req, res, next) {
  try {
    const result = await booksService.deleteBooksBeforeYear(req.query.year);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// Q16
async function aggregateBooksAfter2000Sorted(req, res, next) {
  try {
    return res.status(200).json(await booksService.aggregateBooksAfter2000Sorted());
  } catch (error) {
    return next(error);
  }
}

// Q17
async function aggregateBookSummaryAfter2000(req, res, next) {
  try {
    return res.status(200).json(await booksService.aggregateBookSummaryAfter2000());
  } catch (error) {
    return next(error);
  }
}

// Q18
async function aggregateBooksByGenre(req, res, next) {
  try {
    return res.status(200).json(await booksService.aggregateBooksByGenre());
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createBook,
  createBooksBatch,
  updateFutureBookYear,
  findBookByTitle,
  findBooksByYearRange,
  findBooksByGenre,
  findBooksWithSkipAndLimit,
  findBooksWithIntegerYear,
  findBooksExcludingGenres,
  deleteBooksBeforeYear,
  aggregateBooksAfter2000Sorted,
  aggregateBookSummaryAfter2000,
  aggregateBooksByGenre,
};
