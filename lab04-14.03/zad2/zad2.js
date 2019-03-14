/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let tekst = "Ala i As poszli w las";

String.prototype.nbsp = function() {
  return this.replace(" a ", " a&nbsp;")
    .replace(" i ", " i&nbsp;")
    .replace(" o ", " o&nbsp;")
    .replace(" u", " u&nbsp;")
    .replace(" w ", " w&nbsp;")
    .replace(" z ", " z&nbsp;");
};

console.log(tekst.nbsp());
