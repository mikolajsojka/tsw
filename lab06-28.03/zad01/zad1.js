/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const asyncGenFun = (txt, cb) => {
  setTimeout(() => {
    cb(`${txt}`);
  }, Math.random() * 1000);
};

const fun1 = asyncGenFun;
const fun2 = asyncGenFun;

const poKolei = (fun1, fun2, cb) => {
  return fun1("wynik1", dane => {
    console.log(`callback fun1: ${dane}`);
    fun2(dane, dane => {
      console.log(`callback fun2: ${dane}`);
      cb(`cb(${dane})`);
    });
  });
};

poKolei(fun1, fun2, dane => {
  console.log(`${dane}`);
});
