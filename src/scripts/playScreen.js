import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';
import { printBeat } from "./game_logic/beat";

export const renderGameplayScreen = () => {
  const screen = document.getElementById("screen");
  
  const gameplayCanvas = document.createElement("canvas");
  gameplayCanvas.classList.add("canvas");
  gameplayCanvas.id = "gameplay-canvas";

  const beatsCanvas = document.createElement("canvas");
  beatsCanvas.classList.add("canvas");
  beatsCanvas.id = "beats-canvas";

  screen.appendChild(gameplayCanvas);
  screen.appendChild(beatsCanvas);
  
  populateGoals();
  setInterval(printBeat,2000);

  loadSound("../../assets/Songs/Me!Me!Me! Pt. 1 (feat. Daoko) - TeddyLoid.mp3");
};
