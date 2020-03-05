import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';
import { printBeat } from "./game_logic/beat";

export const renderGameplayScreen = (playingTrack) => {
  const screen = document.getElementById("screen");
  
  const gameplayCanvas = document.createElement("canvas");
  gameplayCanvas.classList.add("canvas");
  gameplayCanvas.id = "gameplay-canvas";

  screen.appendChild(gameplayCanvas);
  
  populateGoals();

  loadSound(playingTrack);
};
