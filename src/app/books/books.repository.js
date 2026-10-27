const { getDatabase } = require("../common/db/connection");

function booksCollection() {
  return getDatabase().collection("books");
}

// Q5: Insert one book.
async function createBook(bookData) {
  return booksCollection().insertOne(bookData);
}

// Q6: Insert at least three books in one request.
async function createBooksBatch(books) {
  return booksCollection().insertMany(books);
}

// Q8: Change the year for the requested title.
async function updateBookYear(title, year) {
  return booksCollection().updateOne({ title }, { $set: { year } });
}

// Q9: Find one book by its title.
async function findBookByTitle(title) {
  return booksCollection().findOne({ title });
}

// Q10: Find books in an inclusive year range.
async function findBooksByYearRange(from, to) {
  return booksCollection()
    .find({ year: { $gte: from, $lte: to } })
    .toArray();
}

// Q11: Find books whose genres array contains this genre.
async function findBooksByGenre(genre) {
  return booksCollection().find({ genres: genre }).toArray();
}

// Q12: Skip two books, then return the next three ordered by year descending.
async function findBooksWithSkipAndLimit() {
  return booksCollection().find().sort({ year: -1 }).skip(2).limit(3).toArray();
}

// Q13: Match documents whose year is stored as a BSON integer.
async function findBooksWithIntegerYear() {
  return booksCollection().find({ year: { $type: "int" } }).toArray();
}

// Q14: Exclude books containing either genre.
async function findBooksExcludingGenres() {
  return booksCollection()
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();
}

// Q15: Delete books published strictly before the given year.
async function deleteBooksBeforeYear(year) {
  return booksCollection().deleteMany({ year: { $lt: year } });
}

// Q16: Filter after 2000 and sort by year descending using an aggregation pipeline.
async function aggregateBooksAfter2000Sorted() {
  return booksCollection()
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();
}

// Q17: Filter after 2000 and return only title, author, and year.
async function aggregateBookSummaryAfter2000() {
  return booksCollection()
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();
}

// Q18: Turn each genre array item into its own result document.
async function aggregateBooksByGenre() {
  return booksCollection()
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();
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
