const express = require("express");
const app = express();
const port = 4400;

app.get("/", (req, res) => {
  res.send("<h1>Backend TPI Icaro</h1>");
});

app.listen(port, () => {
  console.log(`Server available at http://localhost:${port}`);
});