const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");

bookRouter.route("/books").get(async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
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
