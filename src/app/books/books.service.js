const booksRepository = require("./books.repository");

function makeError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function requireNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw makeError(`${fieldName} must be a non-empty string.`);
  }
}

function parseYear(value, fieldName = "year") {
  const year = Number(value);
  if (!Number.isInteger(year)) {
    throw makeError(`${fieldName} must be an integer.`);
  }
  return year;
}

// Q5
async function createBook(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw makeError("A book object is required.");
  }
  requireNonEmptyString(data.title, "title");
  return booksRepository.createBook(data);
}

// Q6
async function createBooksBatch(data) {
  if (!Array.isArray(data) || data.length < 3) {
    throw makeError("Provide an array containing at least three books.");
  }
  for (const book of data) {
    if (!book || typeof book !== "object" || Array.isArray(book)) {
      throw makeError("Each item must be a book object.");
    }
    requireNonEmptyString(book.title, "title");
  }
  return booksRepository.createBooksBatch(data);
}

// Q8
async function updateBookYear(title, year) {
  requireNonEmptyString(title, "title");
  return booksRepository.updateBookYear(title, year);
}

// Q9
async function findBookByTitle(title) {
  requireNonEmptyString(title, "title");
  return booksRepository.findBookByTitle(title);
}

// Q10
async function findBooksByYearRange(fromValue, toValue) {
  const from = parseYear(fromValue, "from");
  const to = parseYear(toValue, "to");
  if (from > to) throw makeError("from must be less than or equal to to.");
  return booksRepository.findBooksByYearRange(from, to);
}

// Q11
async function findBooksByGenre(genre) {
  requireNonEmptyString(genre, "genre");
  return booksRepository.findBooksByGenre(genre);
}

// Q12
async function findBooksWithSkipAndLimit() {
  return booksRepository.findBooksWithSkipAndLimit();
}

// Q13
async function findBooksWithIntegerYear() {
  return booksRepository.findBooksWithIntegerYear();
}

// Q14
async function findBooksExcludingGenres() {
  return booksRepository.findBooksExcludingGenres();
}

// Q15
async function deleteBooksBeforeYear(yearValue) {
  const year = parseYear(yearValue);
  return booksRepository.deleteBooksBeforeYear(year);
}

// Q16
async function aggregateBooksAfter2000Sorted() {
  return booksRepository.aggregateBooksAfter2000Sorted();
}

// Q17
async function aggregateBookSummaryAfter2000() {
  return booksRepository.aggregateBookSummaryAfter2000();
}

// Q18
async function aggregateBooksByGenre() {
  return booksRepository.aggregateBooksByGenre();
}

module.exports = {
  createBook,
  createBooksBatch,
  updateBookYear,
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
