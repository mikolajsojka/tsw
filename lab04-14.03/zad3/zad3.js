/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let szablon =
  '<table border="{border}">' +
  "  <tr><td>{first}</td><td>{last}</td></tr>" +
  "</table>";

let dane = {
  first: "Jan",
  last: "Kowalski",
  pesel: "97042176329"
};

String.prototype.podstaw = function({ first = "{first}", last = "{last}" }) {
  return this.replace(/{first}/, first).replace(/{last}/, last);
};

console.log(szablon.podstaw(dane));
