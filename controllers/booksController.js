function booksController(Book) {
  async function post(req, res) {
    try {
      const book = new Book(req.body);
      if (!req.body.title) {
        res.status(400);
        return res.send("Title is required");
      }
      const response = await book.save();
      res.status(201);
      return res.json(response);
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
      const returnBooks = books.map(book => {
        let newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    } catch (err) {
      res.send(err);
    }
  }

  return { post, get };
}

module.exports = booksController;
