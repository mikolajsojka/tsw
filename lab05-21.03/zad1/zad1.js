/* jshint strict: global, esversion: 6, devel: true */
"use strict";

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

      ruch_copy = ruch_copy.filter(function (el) {
        return el != undefined;
      });

      return `Czarne: ${result.black}, Białe: ${result.white}`;
    } else {
      throw { typerr: "Różne rozmiary tablic!" };
    }
  };
};

let kod = [1, 2, 1, 2];
let ruch = [2, 1, 2, 0];

try {
  console.log(ocena(kod)(ruch));
} catch (e) {
  console.log(e.typerr);
}
