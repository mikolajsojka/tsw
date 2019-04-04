//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const uuidv1 = require('uuid/v1');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Serwer działa pomyślnie");
});

app.post("/game/new", (req, res) => {
  
  let newGameRes = {
    game: uuidv1(),
    size: req.body.size || 5,
    colors: req.body.colors || 9,
    steps: req.body.steps || "infinity"
  };

  res.send(newGameRes);
});

app.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
