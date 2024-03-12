const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const apiV1 = require("./routes/apiV1");

const app = express();

// security related section
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// logging section
app.use(morgan("tiny"));

// app related section
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use("/v1", apiV1);

app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
