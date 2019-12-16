const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
if (process.env.ENV === "Test") {
  console.log("Test");
  const db = mongoose.connect("mongodb://localhost/bookAPI_Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} else {
  console.log("Prod");
  const db = mongoose.connect("mongodb://localhost/bookAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Aum Namah Shivaya");
});

app.server = app.listen(port, () => {
  console.log(`Hara Hara Mahadeva ${port}`);
});

module.exports = app;
