const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("server started on port" + `${port}`);
});