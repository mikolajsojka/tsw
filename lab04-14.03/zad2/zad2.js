/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let tekst = "Ala i As poszli w las";

String.prototype.nbsp = function() {
  return this.replace(/{i }/, "&nbsp;");
};

console.log(tekst.nbsp());
