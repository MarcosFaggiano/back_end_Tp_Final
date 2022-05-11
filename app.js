const express = require("express");
const app = express();
const port = 3000;



const userRouter= require("./src/routes/users");
const messageRouter= require("./src/routes/messages");


app.use(userRouter);
app.use(messageRouter);



app.get("/", (req, res) => {
  res.send("<h1>Backend TPI Icaro</h1>");
});


app.listen(port, () => {
  console.log(`Server available at http://localhost:${port}`);
});
