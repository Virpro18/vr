const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./databases/db");

app.use(bodyParser.json());
app.use(express.json());
app
  .use(express.static("api/views"))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "html");

app.get("/", (req, res) => {
  const sql = "INSERT INT nano VALUES('2','dasdasd','latency')";
  res.render(`index`);
  db.query(sql, (err, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(fields);
    }
  });
});
app.post(`/app`, (req, res) => {
  const data = req.body;
  console.table(data);
  res.send("complete");
});

app.listen(3002, () => console.log("Server ready on port 3000."));

module.exports = app;
