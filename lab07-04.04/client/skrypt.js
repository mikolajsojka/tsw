/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  var sendRequest, handleResponse;

  let LocalGames = JSON.parse(window.localStorage.getItem("games"));
  let yourGames = document.getElementById("yourGames");
  let actual = "";

  LocalGames.forEach(element => {
    actual += `</br><div id=${element.id} class="actualGame">${element.id}</div></br>`;    
  });

  yourGames.innerHTML = actual;

  sendRequest = () => {
    //localStorage.clear();

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
      let test = xmlRes.getElementsByTagName("id")[0].firstChild.nodeValue;

      let element = {id:test};
      let elements = [element];

      let games = JSON.parse(window.localStorage.getItem("games"));

      if(games){
        games.push(element);
        window.localStorage.setItem("games", JSON.stringify(games));
      } else{
        window.localStorage.setItem("games", JSON.stringify(elements));
      }

      document.getElementById("new").style.display = "none";
      document.getElementById("gameId").style.display = "flex";
      document.getElementById("gameId").innerHTML = test;
    }
  };

  actualGamesClick = () => {
    document.getElementById("new").style.display = "none";
    document.getElementById("yourGames").style.display = "block";
  };

  let newGame = document.getElementById("newGame");
  newGame.addEventListener("click", sendRequest, false);

  let actualGames = document.getElementById("actualGames");
  actualGames.addEventListener("click", actualGamesClick, false);
});
