/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  var sendRequest, handleResponse;

  sendRequest = () => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      handleResponse(xhr);
    };
    xhr.open("GET", "http://localhost:3000", true);

    xhr.send();
  };

  handleResponse = xhr => {
    if (xhr.status === 200) {
      let xmlRes = xhr.responseXML;
      let test = xmlRes.getElementsByTagName('test')[0];
      console.log(test.textContent);
    }
  };

  let newGame = document.getElementById("actual_games");
  newGame.addEventListener("click", sendRequest, false);
});
