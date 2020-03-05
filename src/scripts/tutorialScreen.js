import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';
import { printBeat } from "./game_logic/beat";

export const renderTutorialScreen = (playingTrack) => {
  const screen = document.getElementById("screen");
  
  const gameplayCanvas = document.createElement("canvas");
  gameplayCanvas.classList.add("canvas");
  gameplayCanvas.id = "gameplay-canvas";

  screen.appendChild(gameplayCanvas);

  const back = document.createElement("button");
  back.textContent = "back";
  back.id = "back";
  document.body.appendChild(back);

  let p = document.createElement("p");
  p.id = "tutorial";
  p.textContent = "1. Use EFVNJI to hit notes. 2. Use [spacebar] to pause.";
  document.body.appendChild(p);
  
  
  populateGoals();
  
  let beatsTut = setInterval(printBeat, 1500);

  back.addEventListener("click", () => {
    gameplayCanvas.remove();
    back.remove();
    p.remove();
    clearInterval(beatsTut);
    renderHomeScreen();
  });
};
