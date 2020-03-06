import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';
import { printBeat } from "./game_logic/beat";
import { renderSongSelectScreen } from "./songSelectScreen";
import { addScore } from "./game_logic/score";

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
  

  // canvas elements
  let paused = false;
  let totalScore = 0;
  let pressedKeys = [];
  const c = gameplayCanvas.getContext('2d');

  gameplayCanvas.width = innerWidth;
  gameplayCanvas.height = innerHeight;

  const goalPos = [
    [gameplayCanvas.width / 6, gameplayCanvas.height / 2],
    [(gameplayCanvas.width / 4) + 20, gameplayCanvas.height * (2 / 3)],
    [(gameplayCanvas.width / 2) - 100, gameplayCanvas.height * (5 / 6)],
    [(gameplayCanvas.width / 2) + 100, gameplayCanvas.height * (5 / 6)],
    [(gameplayCanvas.width * (3 / 4)) - 20, gameplayCanvas.height * (2 / 3)],
    [gameplayCanvas.width * (5 / 6), gameplayCanvas.height / 2],
  ];

  const goalKeys = ["e", "f", "v", "n", "j", "i"];

  animate();
  
  loadSound(playingTrack, goalPos, goalKeys, pressedKeys, c, totalScore);
  
  function animate () {
    console.log("totalScore"+totalScore)
    const canvasElements = [];
    const playGoals = populateGoals(goalPos, goalKeys, c, pressedKeys);
    canvasElements.push(...playGoals);
    canvasElements.push(addScore(totalScore, c));

    if (!paused) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animate);
    }
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    canvasElements.forEach(el => {
      el.update();
    });
  };

  addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 69:
        pressedKeys.push("e");
        return;
      case 70:
        pressedKeys.push("f");
        return;
      case 86:
        pressedKeys.push("v");
        return;
      case 78:
        pressedKeys.push("n");
        return;
      case 74:
        pressedKeys.push("j");
        return;
      case 73:
        pressedKeys.push("i");
        return;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 69:
        pressedKeys = pressedKeys.filter((el) => el !== "e");
        return;
      case 70:
        pressedKeys = pressedKeys.filter((el) => el !== "f");
        return;
      case 86:
        pressedKeys = pressedKeys.filter((el) => el !== "v");
        return;
      case 78:
        pressedKeys = pressedKeys.filter((el) => el !== "n");
        return;
      case 74:
        pressedKeys = pressedKeys.filter((el) => el !== "j");
        return;
      case 73:
        pressedKeys = pressedKeys.filter((el) => el !== "i");
        return;
    }
  });

  addEventListener("keypress", (e) => {
    if (e.keyCode === 32) {
      if (paused) {
        paused = false;
        animate(canvasElements, paused, c);
      } else {
        paused = true;
      }
    }
  });
};