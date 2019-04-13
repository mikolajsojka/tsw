//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ocena = kod => {
  return ruch => {
    let visited = [];

    let ruch_copy = ruch;

    let result = {
      white: 0,
      black: 0
    };

    if (kod.length === ruch.length) {
      ruch_copy.forEach((element, index) => {
        if (element === kod[index] && !visited.includes(index)) {
          visited.push(index);
          delete ruch_copy[index];
          result.black += 1;
        }
      });

      kod.forEach((Kelement, Kindex) => {
        ruch_copy.forEach((Relement, Rindex) => {
          if (!visited.includes(Kindex) && Kelement === Relement) {
            delete ruch_copy[Rindex];
            visited.push(Kindex);
            result.white += 1;
          }
        });
      });

      ruch_copy = ruch_copy.filter(function(el) {
        return el != undefined;
      });

      return result;
    } else {
      throw { typerr: "Różne rozmiary tablic!" };
    }
  };
};

app.get("/", (_req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/xml",
    "Cache-control": "no-cache",
    "Pragma": "no-cache"
  });

  res.write("<response><test>Serwer działa pomyślnie</test></response>");
  res.end();
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

app.post("/game/move", (req, res) => {
  let code = [1, 2, 1, 2, 1];
  let move = req.body.move;

  let game = req.body.game;

  try {
    let result = ocena(code)(move);
    res.json({
      game,
      result
    });
  } catch (e) {
    res.send(e.typerr);
  }
});

app.post("/game/status", (req, res) => {
  let game = req.body.game;
  let status = false;

  res.json({ game, status });
});

app.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
