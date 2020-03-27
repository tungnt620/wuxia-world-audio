const { getBooks, getChapter } = require("./helpers");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4002;

const corsOptions = {
  origin: ["http://localhost:3000", "audiocuatui.com"],
  credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/api/book", async function(req, res) {
  const resp = await getBooks(req.query);
  await res.json(resp);
});

app.get("/api/book/chapter", async function(req, res) {
  const resp = await getChapter(req.query);
  await res.json(resp);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
