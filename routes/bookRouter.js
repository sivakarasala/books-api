/* eslint-disable no-param-reassign */
const express = require("express");
const booksController = require("../controllers/booksController");

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter
    .route("/books")
    .post(controller.post)
    .get(controller.get);

  bookRouter.use("/books/:bookId", async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    } catch (err) {
      return res.send(err);
    }
  });
  bookRouter
    .route("/books/:bookId")
    .get((req, res) => {
      const returnBook = req.book.toJSON();

      returnBook.links = {};
      const genre = req.book.genre.replace(" ", "%20");
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      return res.json(returnBook);
    })
    .put(async (req, res) => {
      try {
        const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        const updatedBook = await book.save();
        return res.json(updatedBook);
      } catch (err) {
        res.send(err);
      }
    })
    .patch(async (req, res) => {
      try {
        const { book } = req;
        // eslint-disable-next-line no-underscore-dangle
        if (req.body._id) {
          // eslint-disable-next-line no-underscore-dangle
          delete req.body._id;
        }
        Object.entries(req.body).forEach(item => {
          const key = item[0];
          const value = item[1];
          book[key] = value;
        });
        const updatedBook = await book.save();
        return res.json(updatedBook);
      } catch (err) {
        res.send(err);
      }
    })
    .delete(async (req, res) => {
      try {
        await req.book.remove();
        return res.sendStatus(204);
      } catch (err) {
        return res.send("Not Found");
      }
    });

  return bookRouter;
}

module.exports = routes;
