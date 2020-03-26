import { loadSound } from "../music/sound_v2";
import { populateGoals } from '../game_logic/goals';
import { renderSongSelectScreen } from "./songSelectScreen";
import { addScore } from "../game_logic/score";
import { renderGameOverScreen } from "./gameoverScreen";
import { renderHomeScreen } from "./homeScreen";

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

  back.addEventListener("click", goBack);

  function goBack(){
    if (gameplayCanvas)gameplayCanvas.remove();
    if (back)back.remove();
    const audioElement = document.querySelector('audio');
    if (audioElement)audioElement.remove();
    const volumeBar = document.getElementById("volume");
    if (volumeBar)volumeBar.remove();
    const playButton = document.getElementById("play-button");
    if (playButton)playButton.remove();
    let scoreCanvas = document.getElementById("score-canvas");
    if (scoreCanvas) scoreCanvas.remove();
    let selectCanvas = document.getElementById("songSelectCanvas");
    if (selectCanvas) selectCanvas.remove();

    let arts = [
      "./src/media/Trackart/mememe.png",
      "./src/media/Trackart/sk.png",
      "./src/media/Trackart/three.png",
    ];
    let keepRemoving = true;
    while (keepRemoving) {
      for (let i = 0; i < 3; i++) {
        let trackArt = document.getElementById(arts[i]);
        let newBack = document.getElementById("back");
        if (trackArt) trackArt.remove();
        if (newBack) newBack.remove();
        if (!trackArt && !newBack) keepRemoving = false;

      }
    }

    renderSongSelectScreen();
  }

  let finishTime = parseInt(Date.now() + (playingTrack.duration * 1000) + 5000 + 3000);
  let songOver = {done: Boolean((Date.now() - finishTime) > 250)};
  
  // canvas elements
  let paused = {paused: false};
  let totalScore = {score: 0};
  let totalNotes = {hits: 0, misses: 0};
  let pressedKeys = { "e": false, "f": false, "v": false, "n": false, "j": false, "i": false};
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
  canvasElements.push(loadSound(playingTrack, goalPos, goalKeys, pressedKeys, c, totalScore, totalNotes, paused));
  canvasElements.push(addScore(totalScore, finishTime));
  const playGoals = populateGoals(goalPos, goalKeys, c, pressedKeys, totalScore, totalNotes);
  canvasElements.push(...playGoals);

  animate();
    
  function animate () {
    if (!paused.paused) {
      if (totalNotes.misses > 4 || songOver.done) {
        goBack();
        window.removeEventListener("keypress", showSelectCB);
        renderGameOverScreen(totalNotes, totalScore);
        cancelAnimationFrame(animate);
      } else {
        requestAnimationFrame(animate);
        songOver.done = Boolean((Date.now() - finishTime) > 250);
      }
    }
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    canvasElements.forEach(el => {
      el.update();
    });
  };

  function showSelectCB(e){
    if (e.keyCode === 32) {
      goBack();
      renderSongSelectScreen();
      removeEventListener("keypress", showSelectCB);
    }
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

  addEventListener("keypress", showSelectCB);
};