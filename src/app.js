const express = require("express");
const http = require("http");
const app = express();
const port = 4400;

app.get("/", (req, res) => {
  res.send("<h1>Backend TPI Icaro");
});

app.listen(port, () => {
  console.log(`Server available at http://localhost:${port}`);
});
