function booksController(Book) {
  async function post(req, res) {
    try {
      const book = new Book(req.body);
      const response = await book.save();
      return res.status(201).json(response);
    } catch (err) {
      return res.send(err);
    }
  }

  async function get(req, res) {
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
  }

  return { post, get };
}

module.exports = booksController;
