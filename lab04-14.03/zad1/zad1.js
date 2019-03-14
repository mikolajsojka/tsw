/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const defFun = (fun, types) => {
  fun.typeConstr = types;

  return fun;
};

const myfun = defFun((a, b) => a + b, ["number", "number"]);

const appFun = (f, arg1, arg2) => {
  if (typeof arg1 === f.typeConstr[0] && typeof arg2 === f.typeConstr[1]) {
    return f(arg1, arg2);
  } else {
    throw { typerr: "Błąd typów!!!" };
  }
};

try {
  console.log(appFun(myfun, 12, 16));
} catch (e) {
  console.log(e.typerr);
}
