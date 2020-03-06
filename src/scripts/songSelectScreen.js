import { renderHomeScreen } from './homeScreen';
import { renderGameplayScreen } from './playScreen';

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

  let songs = [
    "../../Songs/Me!Me!Me! Pt. 1 (feat. Daoko) - TeddyLoid.mp3",
    "../../Songs/ダイスキ ft. TeddyLoid - Daoko.mp3",
    "../../Songs/Me!Me!Me! Pt. 3 (feat. Daoko) - TeddyLoid.mp3",
  ];
  let arts = [
    "../../Trackart/mememe.png",
    "../../Trackart/sk.png",
    "../../Trackart/three.png",
  ];

  back.addEventListener("click", () => {
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