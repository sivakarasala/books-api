/* eslint-disable no-param-reassign */
const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter
    .route("/books")
    .post(async (req, res) => {
      const book = new Book(req.body);

      await book.save();
      return res.status(201).json(book);
    })
    .get(async (req, res) => {
      try {
        const query = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        const books = await Book.find(query);
        res.json(books);
      } catch (err) {
        res.send(err);
      }
    });

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
    .get((req, res) => res.json(req.book))
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
