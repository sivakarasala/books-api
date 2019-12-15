const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Aum Namah Shivaya");
});

app.listen(port, () => {
  console.log(`Hara Hara Mahadeva ${port}`);
});
