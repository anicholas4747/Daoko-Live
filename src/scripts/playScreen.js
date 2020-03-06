import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';
import { printBeat } from "./game_logic/beat";
import { renderSongSelectScreen } from "./songSelectScreen";

export const renderGameplayScreen = (playingTrack) => {
  const screen = document.getElementById("screen");
  
  const gameplayCanvas = document.createElement("canvas");
  gameplayCanvas.classList.add("canvas");
  gameplayCanvas.id = "gameplay-canvas";

  screen.appendChild(gameplayCanvas);

  const back = document.createElement("button");
  back.textContent = "back";
  back.id = "back";
  document.body.appendChild(back);

  back.addEventListener("click", () => {
    gameplayCanvas.remove();
    back.remove();
    renderSongSelectScreen();
    const audioElement = document.querySelector('audio');
    audioElement.remove();
    const volumeBar = document.getElementById("volume");
    volumeBar.remove();
  });
  
  populateGoals();

  loadSound(playingTrack);
};
