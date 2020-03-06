import * as flex from './flex/mouse_tracking';
import { renderSongSelectScreen } from './songSelectScreen';
import { renderTutorialScreen } from './tutorialScreen';

export const renderHomeScreen = () => {
  const screen = document.getElementById("screen");

  let oldCanvas = document.getElementById("gameplayCanvas");
  if (oldCanvas) oldCanvas.remove();
  oldCanvas = document.getElementById("songSelectCanvas");
  if (oldCanvas) oldCanvas.remove();
  
  const logo = document.createElement("img");
  logo.setAttribute("src","../../assets/images/daoko_logo.png");
  logo.id = "logo";
  
  screen.appendChild(logo);
  
  const songSelect = document.createElement("button");
  const tut = document.createElement("button");
  // const cyo = document.createElement("button");
  
  songSelect.id = "songSelect";
  tut.id = "tut";
  // // cyo.id = "cyo";
  
  songSelect.textContent = "jump in";
  tut.textContent = "tutorial";
  // cyo.textContent = "create your own";
  
  document.body.appendChild(songSelect);
  document.body.appendChild(tut);
  // document.body.appendChild(cyo);
  
  songSelect.addEventListener("click", () => {
    renderSongSelectScreen();

    songSelect.remove();
    tut.remove();
    // cyo.remove();
    logo.remove();
  });

  tut.addEventListener("click", () => {
    renderTutorialScreen();

    songSelect.remove();
    tut.remove();
    // cyo.remove();
    logo.remove();
  });

  // cyo.addEventListener("click", () => {
  //   const newCanvas = document.createElement("canvas");
  //   newCanvas.classList.add("canvas");
  //   newCanvas.id = "gameplayCanvas";

  //   screen.appendChild(newCanvas);

  //   require('./playScreen');
  // });
};
