/* jshint esversion: 6, strict: global */
'use strict';
const title = (str) => {
    console.log("-".repeat(80));
    console.log(" " + str);
    console.log("-".repeat(80));
};

//==================================
// Jak poradzić sobie z problemem?
//==================================

//----------------------------------------------------
// Podejście 1: „wywołania zwrotne” (ang. callbacks)
//----------------------------------------------------
const getFileViaCallback = (url, cb) => {
    setTimeout(() => {
        console.log(`pobieram „${url}”`);
        cb(`zawartość „${url}”`);
    }, Math.random() * 1000);
}

title("1. callbacks (wywołania zwrotne)");
console.log("początek");
getFileViaCallback("plik2", (dane) => {
    console.log(`pobrałem: ${dane}`);
    getFileViaCallback("plik3", (dane) => {
        console.log(`pobrałem: ${dane}`);
        console.log("koniec");
    });
});