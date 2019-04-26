/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  count = () => {

    let dom = document.querySelector("html");

    console.log(dom.nextSibling);

    return "test";
  }

  alert(count());

});
