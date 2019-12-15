const express = require("express");

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

bookRouter.route("/books").get((req, res) => {
  const response = { shiva: "From Kailash" };

  res.json(response);
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Aum Namah Shivaya");
});

app.listen(port, () => {
  console.log(`Hara Hara Mahadeva ${port}`);
});
