/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  var sendRequest, handleResponse;

  sendRequest = (url, method, body) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      handleResponse(xhr, url);
    };

    xhr.open(method, `http://localhost:3000/${url}`, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
  };

  handleResponse = (xhr, url) => {
    if (xhr.status === 200) {
      if (url === "game/new") {
        handleNewGame(xhr);
      }

      if (url === "game/move") {
        handleNewMove(xhr);
      }

      if (url === "game/status") {
        handleNewStatus(xhr);
      }
    } else {
      alert("Coś poszło nie tak");
    }
  };

  handleNewStatus = xhr => {
    let xmlRes = xhr.responseXML;

    let gameId = xmlRes.getElementsByTagName("game")[0].firstChild.nodeValue;
    let status = xmlRes.getElementsByTagName("status")[0].firstChild.nodeValue;

    let currentGame = JSON.parse(window.localStorage.getItem("currentGame"));
    let LocalGames = JSON.parse(window.localStorage.getItem("games"));

    LocalGames.forEach(element => {
      if (element.id === gameId) {
        element.status = status;
      }
    });

    window.localStorage.setItem("games", JSON.stringify(LocalGames));
    currentGame.status = status;
  };

  handleNewMove = xhr => {
    let xmlRes = xhr.responseXML;

    let white = xmlRes.getElementsByTagName("white")[0].firstChild.nodeValue;
    let black = xmlRes.getElementsByTagName("black")[0].firstChild.nodeValue;

    let whiteScore = document.getElementById("white");
    let blackScore = document.getElementById("black");

    whiteScore.innerHTML = white;
    blackScore.innerHTML = black;

    let currentGame = JSON.parse(window.localStorage.getItem("currentGame"));
    let body = JSON.stringify({ game: currentGame.id });

    if (currentGame.size === black) {
      alert("Wygrałeś");
      sendRequest("game/status", "POST", body);
    }
  };

  generateColors = () => {
    let o = Math.round;
    let r = Math.random;
    let s = 255;

    let generatedColor = `rgba(${o(r() * s)},${o(r() * s)},${o(
      r() * s
    )},${r().toFixed(1)})`;

    return generatedColor;
  };

  handleNewGame = xhr => {
    let xmlRes = xhr.responseXML;

    let size = xmlRes.getElementsByTagName("size")[0].firstChild.nodeValue;
    let colors = xmlRes.getElementsByTagName("colors")[0].firstChild.nodeValue;
    let code = Array.from({ length: size }, () =>
      Math.floor(Math.random() * colors + 0)
    );

    let generatedColors = Array.from({ length: colors }, () =>
      generateColors()
    );
    let element = {
      id: xmlRes.getElementsByTagName("id")[0].firstChild.nodeValue,
      size: size,
      colors: colors,
      steps: xmlRes.getElementsByTagName("steps")[0].firstChild.nodeValue,
      code: code,
      generatedColors: generatedColors
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

    changeToGameInterface(element);

    playGame(element);
  };

  changeToGameInterface = element => {
    document.getElementById("new").style.display = "none";
    document.getElementById("gameId").style.display = "flex";
    document.getElementById("yourGames").style.display = "none";
    document.getElementById("gameId").innerHTML = element.id;
    document.getElementById("gameId").setAttribute("value", element.steps);
    document.getElementById("currentGame").style.display = "flex";

    let colors = "";

    element.generatedColors.forEach(element => {
      colors += `<div class="color" style="background-color:${element}"></div>`;
    });

    document.getElementById("colors").innerHTML = colors;
  };

  playGame = element => {
    let inputsSolve = document.getElementById("inputsSolve");
    let currentGame = JSON.parse(window.localStorage.getItem("currentGame"));

    inputsSolve.innerHTML = `${renderInputs(currentGame, element)}`;

    gameSteps(currentGame);

    let input = document.getElementsByClassName("input");

    Array.from(input).forEach(element => {
      element.addEventListener(
        "click",
        inputColorsClick.bind(this, element),
        false
      );
    });
  };

  renderInputs = (currentGame, element) => {
    let inputs = "";
    if(currentGame.lastMove === undefined){
      element.code.forEach((_element, index) => {
        inputs += `<div id="${index}" class="input square" value="0" style="background-color:${
          currentGame.generatedColors[0]
        }"></div>`;
      });
    } else {
      element.code.forEach((_element, index) => {
        inputs += `<div id="${index}" class="input square" value="${currentGame.lastMove[index]}" style="background-color:${
          currentGame.generatedColors[currentGame.lastMove[index]]
        }"></div>`;
      });
    }
      
    

    return inputs;
  };

  inputColorsClick = element => {
    let clickInkrement = parseInt(element.getAttribute("value")) + 1;
    let currentGame = JSON.parse(window.localStorage.getItem("currentGame"));

    if (clickInkrement === parseInt(currentGame.colors)) {
      clickInkrement = 0;
    }

    element.style.backgroundColor = `${
      currentGame.generatedColors[clickInkrement]
    }`;

    element.setAttribute("value", clickInkrement);
  };

  ongameClick = () => {
    let elements = document.getElementsByClassName("actualGamesElement");

    Array.from(elements).forEach(element => {
      element.addEventListener(
        "click",
        onElementClick.bind(this, element),
        false
      );
    });
  };

  onElementClick = elementDOM => {
    let LocalGames = JSON.parse(window.localStorage.getItem("games"));

    if (LocalGames) {
      LocalGames.forEach(element => {
        if (elementDOM.getAttribute("id") === element.id) {
          window.localStorage.setItem("currentGame", JSON.stringify(element));

          playGame(element);
          changeToGameInterface(element);
        }
      });
    } else {
      alert("Brak gier");
    }
  };

  onActualGamesClick = () => {
    let LocalGames = JSON.parse(window.localStorage.getItem("games"));
    let yourGames = document.getElementById("yourGames");
    let actual = "";

    if (LocalGames) {
      LocalGames.forEach(element => {
        actual += `</br><div id="${element.id}" class="actualGamesElement">${
          element.id
        }</div></br>`;
      });
      yourGames.innerHTML = actual;
      document.getElementById("new").style.display = "none";
      document.getElementById("yourGames").style.display = "block";
      ongameClick();
    } else {
      alert("Brak gier");
    }
  };

  onNewGameClick = () => {
    let size = document.getElementById("inputSize").value;
    let colors = document.getElementById("inputColors").value;
    let steps = document.getElementById("inputSteps").value;

    let body = JSON.stringify({ size: size, colors: colors, steps: steps });

    sendRequest("game/new", "POST", body);
  };

  onCheckSolutionClick = () => {
    let currentGame = JSON.parse(window.localStorage.getItem("currentGame"));
    let i = 0;
    let move = [];

    while (i < currentGame.size) {
      move.push(
        parseInt(document.getElementById(`${i}`).getAttribute("value"))
      );
      i++;
    }

    currentGame.lastMove = move;

    let body = JSON.stringify({ code: currentGame.code, move: move });

    if (currentGame.steps === "infinity") {
      gameSteps(currentGame);
      sendRequest("game/move", "POST", body);
    } else {
      if (currentGame.steps <= 0) {
        alert("Przekroczyłeś limit ruchów");
      } else {
        currentGame.steps = parseInt(currentGame.steps) - 1;
        window.localStorage.setItem("currentGame", JSON.stringify(currentGame));
        gameSteps(currentGame);

        let LocalGames = JSON.parse(window.localStorage.getItem("games"));

        LocalGames.forEach(element => {
          if (element.id === currentGame.id) {
            element.steps = currentGame.steps;
            element.lastMove = move;
          }
        });

        window.localStorage.setItem("games", JSON.stringify(LocalGames));

        sendRequest("game/move", "POST", body);
      }
    }
  };

  gameSteps = currentGame => {
    document.getElementById("steps").innerHTML = `Zostało ruchów: ${
      currentGame.steps
    }`;
  };

  onLocalStorageClick = () => {
    localStorage.clear();
  };

  let checkSolution = document.getElementById("checkSolution");
  checkSolution.addEventListener("click", onCheckSolutionClick, false);

  let newGame = document.getElementById("newGame");
  newGame.addEventListener("click", onNewGameClick, false);

  let actualGames = document.getElementById("actualGames");
  actualGames.addEventListener("click", onActualGamesClick, false);

  let clearLocalStorage = document.getElementById("clearLocalStorage");
  clearLocalStorage.addEventListener("click", onLocalStorageClick, false);
});
