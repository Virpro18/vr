const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app
  .use(express.static("api/views"))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "html");

app.get("/", (req, res) => {
  res.render(`index`);
});

app.listen(3020, () => console.log("Server ready on port 3000."));

module.exports = app;
