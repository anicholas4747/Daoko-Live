import { loadSound } from "./music/sound";
import { populateGoals } from './playScreenPieces/goals';
import { printBeat } from "./game_logic/beat";
import { renderHomeScreen } from './homeScreen';

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
  
  // canvas elements
  let paused = false;
  let totalScore = { score: 0 };
  let pressedKeys = { "e": false, "f": false, "v": false, "n": false, "j": false, "i": false };
  const c = gameplayCanvas.getContext('2d');

  gameplayCanvas.width = innerWidth;
  gameplayCanvas.height = innerHeight;

  const goalPos = [
    [gameplayCanvas.width / 6, (gameplayCanvas.height / 2)],
    [(gameplayCanvas.width / 4) + 20, (gameplayCanvas.height * (2 / 3))],
    [(gameplayCanvas.width / 2) - 100, (gameplayCanvas.height * (5 / 6))],
    [(gameplayCanvas.width / 2) + 100, (gameplayCanvas.height * (5 / 6))],
    [(gameplayCanvas.width * (3 / 4)) - 20, (gameplayCanvas.height * (2 / 3))],
    [gameplayCanvas.width * (5 / 6), (gameplayCanvas.height / 2)],
  ];

  const goalKeys = ["e", "f", "v", "n", "j", "i"];

  const canvasElements = [];
  const playGoals = populateGoals(goalPos, goalKeys, c, pressedKeys);
  canvasElements.push(...playGoals);

  animate();

  function animate() {
    if (!paused) {
      // console.log(totalScore.score);
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animate);
    }
    c.clearRect(0, 0, innerWidth, innerHeight);

    canvasElements.forEach(el => {
      el.update();
    });
  };
  let beatsTut = setInterval(() => printBeat(goalPos, goalKeys, paused, pressedKeys, c, totalScore), 1500);

  addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 69:
        pressedKeys.e = true;
        return;
      case 70:
        pressedKeys.f = true;
        return;
      case 86:
        pressedKeys.v = true;
        return;
      case 78:
        pressedKeys.n = true;
        return;
      case 74:
        pressedKeys.j = true;
        return;
      case 73:
        pressedKeys.i = true;
        return;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 69:
        pressedKeys.e = false;
        return;
      case 70:
        pressedKeys.f = false;
        return;
      case 86:
        pressedKeys.v = false;
        return;
      case 78:
        pressedKeys.n = false;
        return;
      case 74:
        pressedKeys.j = false;
        return;
      case 73:
        pressedKeys.i = false;
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
  
  back.addEventListener("click", () => {
    gameplayCanvas.remove();
    back.remove();
    p.remove();
    clearInterval(beatsTut)
    renderHomeScreen();
    
  });
};
