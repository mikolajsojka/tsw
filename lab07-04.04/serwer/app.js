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
    Pragma: "no-cache"
  });

  res.write("<response><test>Serwer działa pomyślnie</test></response>");
  res.end();
});

app.post("/game/new", (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/xml",
    "Cache-control": "no-cache",
    Pragma: "no-cache"
  });

  let newGameRes = {
    game: uuidv1(),
    size: req.body.size || 5,
    colors: req.body.colors || 9,
    steps: req.body.steps || "infinity"
  };

  //res.send(newGameRes);
  res.write(`<response><newGame>
    <id>${newGameRes.game}</id>
    <size>${newGameRes.size}</size>
    <colors>${newGameRes.colors}</colors>
    <steps>${newGameRes.steps}</steps>
    </newGame></response>`);
  res.end();
});

app.post("/game/move", (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/xml",
    "Cache-control": "no-cache",
    Pragma: "no-cache"
  });

  let code = req.body.code;
  let move = req.body.move;

  try {
    let result = ocena(code)(move);

    res.write(`<response><check>
    <white>${result.white}</white>
    <black>${result.black}</black>
    </check></response>`);
    res.end();
  } catch (e) {
    res.write(e.typerr);
    res.end();
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
