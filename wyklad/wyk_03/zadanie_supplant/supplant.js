/* jshint esversion: 6, devel: true, strict: global */
"use strict";

var template =
  '<table border="{border}">' +
  " <tr><td>{first}</td><td>{last}</td></tr>" +
  "</table>";

var data = {
  first: "Jan",
  last: "Kowalski",
  border: "2"
};

String.prototype.supplant = function({
  first = "Przemysław",
  last = "Potocki",
  border = 1
}) {
  return this.replace(/{border}/, border)
    .replace(/{first}/, first)
    .replace(/{last}/, last);
};

console.log(template.supplant(data));
