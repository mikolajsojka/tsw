/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  var sendRequest, handleResponse;

  sendRequest = (url, method, body) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      handleResponse(xhr);
    };

    xhr.open(method, `http://localhost:3000/${url}`, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
  };

  handleResponse = xhr => {
    if (xhr.status === 200) {
      handleNewGame(xhr);
    }
  };

  handleNewGame = xhr => {
    let xmlRes = xhr.responseXML;

    let element = {
      id: xmlRes.getElementsByTagName("id")[0].firstChild.nodeValue,
      size: xmlRes.getElementsByTagName("size")[0].firstChild.nodeValue,
      colors: xmlRes.getElementsByTagName("colors")[0].firstChild.nodeValue,
      steps: xmlRes.getElementsByTagName("steps")[0].firstChild.nodeValue
    };

    let elements = [element];

    let games = JSON.parse(window.localStorage.getItem("games"));

    fillLocalStorageGames(elements, games, element);
  };

  fillLocalStorageGames = (elements, games, element) => {
    if (games) {
      games.push(element);
      window.localStorage.setItem("games", JSON.stringify(games));
    } else {
      window.localStorage.setItem("games", JSON.stringify(elements));
    }
    window.localStorage.setItem("currentGame", JSON.stringify(element));
    document.getElementById("new").style.display = "none";
    document.getElementById("gameId").style.display = "flex";
    document.getElementById("gameId").innerHTML = element.id;
  };

  actualGamesClick = () => {
    let LocalGames = JSON.parse(window.localStorage.getItem("games"));
    let yourGames = document.getElementById("yourGames");
    let actual = "";

    if (LocalGames) {
      LocalGames.forEach(element => {
        actual += `</br><div id=${element.id} class="actualGame">${
          element.id
        }</div></br>`;
      });
    }

    yourGames.innerHTML = actual;

    document.getElementById("new").style.display = "none";
    document.getElementById("yourGames").style.display = "block";
  };

  newGameClick = () => {
    let body = JSON.stringify({ size: 12 });

    sendRequest("game/new", "POST", body);
  };

  localStorageClick = () => {
    localStorage.clear();
  };

  let newGame = document.getElementById("newGame");
  newGame.addEventListener("click", newGameClick, false);

  let actualGames = document.getElementById("actualGames");
  actualGames.addEventListener("click", actualGamesClick, false);

  let clearLocalStorage = document.getElementById("clearLocalStorage");
  clearLocalStorage.addEventListener("click", localStorageClick, false);
});
