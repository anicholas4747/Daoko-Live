import { renderSongSelectScreen } from './songSelectScreen';
import { renderTutorialScreen } from './tutorialScreen';
import tutSong from '../../media/Songs/2bpm_song.mp3';

export const renderHomeScreen = () => {
  const screen = document.getElementById("screen");

  let oldCanvas = document.getElementById("gameplayCanvas");
  if (oldCanvas) oldCanvas.remove();
  oldCanvas = document.getElementById("songSelectCanvas");
  if (oldCanvas) oldCanvas.remove();
  let back = document.getElementById("back");
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
  
  const logo = document.createElement("img");
  logo.id = "logo";
  logo.src = "./src/media/logo/daoko_logo.png";
  
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
    renderTutorialScreen(tutSong);

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
