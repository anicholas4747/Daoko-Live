import './styles/main.css';

// window.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById("canvas");
//   canvas.style.backgroundColor = "#DDD";
//   let c = canvas.getContext("2d");

//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
  
// });

const home = document.createElement("button");
const songSelect = document.createElement("button");
const gamePlay = document.createElement("button");

home.id = "home";
songSelect.id = "songSelect";
gamePlay.id = "gamePlay";

home.textContent = "home";
songSelect.textContent = "songSelect";
gamePlay.textContent = "gamePlay";

document.body.appendChild(home);
document.body.appendChild(songSelect);
document.body.appendChild(gamePlay);

const screen = document.getElementById("screen");

home.addEventListener("click", () => {
  const oldCanvas = document.getElementById("canvas");
  oldCanvas.remove();
  const newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas";

  screen.appendChild(newCanvas);

  const flex = require('./scripts/flex/mouse_tracking');
  flex.init();
  flex.animate();
});

gamePlay.addEventListener("click", () => {
  const oldCanvas = document.getElementById("canvas");
  oldCanvas.remove();
  const newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas";

  screen.appendChild(newCanvas);

  require('./scripts/playScreen');
  require('./scripts/music/sound');
});