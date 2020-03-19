import { loadSound } from "../music/sound";
import { populateGoals } from '../game_logic/goals';
import { printBeat } from "../game_logic/beat";
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
  p.textContent = "1. Use EFVNJI to hit notes. 2. Use [spacebar] to quit.";
  document.body.appendChild(p);
  
  // canvas elements
  let paused = { paused: false };
  let totalScore = { score: 0 };
  let totalMisses = { misses: 0 };
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
  canvasElements.push(loadSound(playingTrack, goalPos, goalKeys, pressedKeys, c, totalScore, totalMisses, paused));
  const playGoals = populateGoals(goalPos, goalKeys, c, pressedKeys, totalScore, totalMisses, true);
  canvasElements.push(...playGoals);

  animate();

  function animate() {
    if (!paused.paused) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animate);
    }
    c.clearRect(0, 0, innerWidth, innerHeight);

    canvasElements.forEach(el => {
      el.update();
    });
  };
  let beatsTut = () => setInterval(() => printBeat(goalPos, goalKeys, paused, pressedKeys, c, totalScore, totalMisses), 2000);
  setTimeout(beatsTut,1250);

  function goBack() {
    if (gameplayCanvas) gameplayCanvas.remove();
    if (back) back.remove();
    const audioElement = document.querySelector('audio');
    if (audioElement) audioElement.remove();
    const volumeBar = document.getElementById("volume");
    if (volumeBar) volumeBar.remove();
    const playButton = document.getElementById("play-button");
    if (playButton) playButton.remove();
    let scoreCanvas = document.getElementById("score-canvas");
    if (scoreCanvas) scoreCanvas.remove();
    let selectCanvas = document.getElementById("songSelectCanvas");
    if (selectCanvas) selectCanvas.remove();
    let instructionsP = document.getElementById("tutorial");
    if (instructionsP) instructionsP.remove();
    renderHomeScreen();
  }

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
      goBack();
      // location.reload();
    }
  });
  
  back.addEventListener("click", goBack);
};
