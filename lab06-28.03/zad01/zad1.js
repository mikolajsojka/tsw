/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const asyncGenFun = (txt, cb) => {
  setTimeout(() => {
    cb(`${txt}`);
  }, Math.random() * 5000);
};

const fun1 = asyncGenFun;
const fun2 = asyncGenFun;

const poKolei = (fun1, fun2, cb) => {
  fun1("wynik1", dane1 => {
    console.log(`fun1: ${dane1}`);
    fun2(
      "wynik2",
      dane2 => {
        console.log(`fun2: ${dane1}`);
        cb(`cb(${dane2})`);
      },
      dane1
    );
  });
};

poKolei(fun1, fun2, dane => {
  console.log(`${dane}`);
});
