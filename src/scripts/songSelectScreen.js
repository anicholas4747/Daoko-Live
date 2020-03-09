import { renderHomeScreen } from './homeScreen';
import { renderGameplayScreen } from './playScreen';
import song1 from "../../Songs/mememp1.mp3";
import song2 from "../../Songs/sk.mp3";
import song3 from "../../Songs/mememp3.mp3";
import art1 from "../../Songs/Trackart/mememe.png";
import art2 from "../../Songs/Trackart/sk.png";
import art3 from "../../Songs/Trackart/three.png";

export const renderSongSelectScreen = () => {
  const screen = document.getElementById("screen");

  const newCanvas = document.createElement("canvas");
  newCanvas.classList.add("canvas");
  newCanvas.id = "songSelectCanvas";

  const back = document.createElement("button");
  back.textContent = "back";
  back.id = "back";
  document.body.appendChild(back);

  screen.appendChild(newCanvas);

  let songs = [song1, song2, song3];
  let arts = [art1, art2, art3];

  // let songs = [
  //   "../../Songs/mememp1.mp3",
  //   "../../Songs/sk.mp3",
  //   "../../Songs/mememp3.mp3",
  // ];
  // let arts = [
  //   "../../Trackart/mememe.png",
  //   "../../Trackart/sk.png",
  //   "../../Trackart/three.png",
  // ];

  back.addEventListener("click", () => {
    let scoreCanvas = document.getElementById("score-canvas");
    if (scoreCanvas) scoreCanvas.remove();
    newCanvas.remove();
    back.remove();
    for (let i = 0; i < 3; i++) {
      document.getElementById(arts[i]).remove();
    }
    renderHomeScreen();
  });

  const c = newCanvas.getContext('2d');
  newCanvas.width = innerWidth;
  newCanvas.height = innerHeight;

  for(let i = 0; i < 3; i++){
    let trackArt = document.createElement("img");
    trackArt.classList.add("track-art");
    trackArt.src = arts[i];
    trackArt.id = arts[i];
    trackArt.style.top = `${22+(15*i)}%`;
    trackArt.style.left = `${22+(15*i)}%`;
    document.body.appendChild(trackArt);
    
    trackArt.addEventListener("click", () => {
      renderGameplayScreen(songs[i]);
      for (let i = 0; i < 3; i++) {
        document.getElementById(arts[i]).remove();
      }
      back.remove();
    });
    
  }
};