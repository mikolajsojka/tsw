/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  var sendRequest, handleResponse;

  sendRequest = () => {

    console.log(window.localStorage.getItem('game'));
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      handleResponse(xhr);
    };

    xhr.open("POST", "http://localhost:3000/game/new", true);

    xhr.send();
  };

  handleResponse = xhr => {
    if (xhr.status === 200) {
      let xmlRes = xhr.responseXML;
      let test = xmlRes.getElementsByTagName('id')[0].firstChild.nodeValue;
      window.localStorage.setItem('game', test);

      document.getElementById("new").style.display = "none";
      document.getElementById("gameId").style.display = "flex";
      document.getElementById("gameId").innerHTML = test;
    }
  };

  let newGame = document.getElementById("newGame");
  newGame.addEventListener("click", sendRequest, false);
});
