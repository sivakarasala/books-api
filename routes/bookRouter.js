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

  bookRouter
    .route("/books/:bookId")
    .get(async (req, res) => {
      try {
        const book = await Book.findById(req.params.bookId);
        res.json(book);
      } catch (err) {
        res.send(err);
      }
    })
    .put(async (req, res) => {
      try {
        const book = await Book.findById(req.params.bookId);
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        await book.save();
        return res.json(book);
      } catch (err) {
        res.send(err);
      }
    });

  return bookRouter;
}

module.exports = routes;
