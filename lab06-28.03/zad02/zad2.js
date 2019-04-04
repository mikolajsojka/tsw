/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const asyncGenFun = (txt, cb) => {
  setTimeout(() => {
    cb(`${txt}`);
  }, Math.random() * 1000);
};

const fun1 = asyncGenFun;
const fun2 = asyncGenFun;

const razem = async (fun1, fun2, cb) => {
  await fun1("fun1", dane => {
    console.log(dane);
    
  });

  await fun2("fun2", dane => {
    console.log(dane);
  });
};

razem(fun1, fun2, dane => {
  console.log(`${dane}`);
});
