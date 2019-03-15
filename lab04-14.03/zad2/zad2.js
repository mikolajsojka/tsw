/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let tekst = "Ala i As poszli w las";

String.prototype.nbsp = function() {

  return this.replace(/[\ \n]a[\ \n]/g, " a&nbsp;")
  .replace(/[\ \n]i[\ \n]/g, " i&nbsp;")
  .replace(/[\ \n]o[\ \n]/g, " o&nbsp;")
  .replace(/[\ \n]u[\ \n]/g, " u&nbsp;")
  .replace(/[\ \n]w[\ \n]/g, " w&nbsp;")
  .replace(/[\ \n]z[\ \n]/g, " z&nbsp;");
};

console.log(tekst.nbsp());
