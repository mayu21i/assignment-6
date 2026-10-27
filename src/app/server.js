const express = require("express");
const { connectToDatabase } = require("./common/db/connection");
const collectionRouter = require("./collection/collection.route");
const booksRouter = require("./books/books.route");
const logsRouter = require("./logs/logs.route");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(collectionRouter);
app.use(booksRouter);
app.use(logsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  return res.status(statusCode).json({
    message: statusCode === 500 ? "Something went wrong." : error.message,
  });
});

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

startServer();
