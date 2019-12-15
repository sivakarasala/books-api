const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

bookRouter.route("/books/:bookId").get(async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json(book);
  } catch (err) {
    res.send(err);
  }
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Aum Namah Shivaya");
});

app.listen(port, () => {
  console.log(`Hara Hara Mahadeva ${port}`);
});
