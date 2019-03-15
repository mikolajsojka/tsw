/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const defFun = (fun, types) => {
  fun.typeConstr = types;

  return fun;
};

const myfun = defFun((a, b, c) => a + b + c, ["number", "number", "string"]);

const appFun = function(f) {
  let args = Array.from(arguments).slice(1);
  let types = [];
  let errors = "";

  if (f.typeConstr) {
    types = f.typeConstr;

    args.forEach((element, index) => {
      if (typeof element !== types[index]) {
        errors += `Zły parametr w ${index} argumencie. \n`;
      }
    });
  } else {
    errors += "Funkcja nie posiada parametru typeConstr \n";
  }

  if (errors) {
    throw { typerr: errors };
  } else {
    return f.apply(this, args);
  }
};

try {
  console.log(appFun(myfun, 10, 16, 3));
} catch (e) {
  console.log(e.typerr);
}
