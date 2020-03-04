import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';

export const renderGameplayScreen = () => {
  const screen = document.getElementById("screen");
  
  const gameplayCanvas = document.createElement("canvas");
  gameplayCanvas.classList.add("canvas");
  gameplayCanvas.id = "gameplay-canvas";

  screen.appendChild(gameplayCanvas);
  
  populateGoals();

  loadSound("../../assets/Songs/Me!Me!Me! Pt. 1 (feat. Daoko) - TeddyLoid.mp3");
};
