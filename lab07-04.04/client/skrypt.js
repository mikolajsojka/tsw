/* jshint strict: global, esversion: 6, devel: true */
"use strict";

document.onreadystatechange = function() {
  var sendRequest, handleResponse;

  sendRequest = () => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      handleResponse(xhr);
    };
    xhr.open("GET", "http://localhost:3000/", true);
    xhr.send(null);
  };

  handleResponse = xhr => {
    if (xhr.status === 200) {
      let xmlRes = xhr.responseXML;
      console.log(xmlRes);
    }
  };

  let newGame = document.getElementById("new_but");
  newGame.addEventListener("click", sendRequest, false);
};
