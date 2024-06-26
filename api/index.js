const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./databases/db");
const port = 3220;

app.use(bodyParser.json());
app.use(express.json());
app
  .use(express.static("api/views"))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "html");

app.get("/complete", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "landing-page.html"));
});
app.get("/", (req, res) => {
  res.render(`index`);
});
app.post(`/login`, (req, res) => {
  const data = req.body;

  // Menulis query SQL untuk menginsert data
  const query = `SELECT username,password FROM db WHERE username = ? AND password = ?`;
  console.log(`executing query ${query}`);
  // query execution
  console.log("With values", [data.username, data.password]);
  db.query(query, [data.username, data.password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.code, err.message, err.stack); // Log error details
      return;
    }

    if (results.length === 0) {
      console.log("User not found");
    } else {
      res.redirect("/complete");
      const user = results[0];
      // Lakukan sesuatu dengan data pengguna (misalnya, kirim respons ke klien)
      console.log(results);
      console.log("User found:", user);
    }
  });
});
app.post(`/sign-up`, (req, res) => {
  const data = req.body;
  console.log("With values:", [data.username, data.email, data.password]);

  const query = "INSERT INTO db (username,email,password) VALUES (?,?,?)";
  console.log("Executing query:", query);
  // Mengeksekusi query SQL
  db.query(
    query,
    [data.username, data.email, data.password],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return;
      }
      console.log("Data inserted successfully:", results);
      res.send("complete");
    }
  );
});

app.listen(port, () => console.log(`Server ready on http://localhost:${port}`));

module.exports = app;
