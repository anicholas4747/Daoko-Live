import { renderHomeScreen } from './homeScreen';
import { renderGameplayScreen } from './playScreen';
// import song1 from "../../media/Songs/mememep1.mp3";
// import song2 from "../../media/Songs/sk.mp3";
// import song3 from "../../media/Songs/mememep3.mp3";

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

  // let songs = [song1, song2, song3];
  // let arts = [art1, art2, art3];

  let songs = [
    "../../src/media/Songs/mememep1.mp3",
    "../../src/media/Songs/sk.mp3",
    "../../src/media/Songs/mememep3.mp3",
  ];
  let arts = [
    "./src/media/Trackart/mememe.png",
    "./src/media/Trackart/sk.png",
    "./src/media/Trackart/three.png",
  ];

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
      function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        // Decode asynchronously
        request.onload = function () {
          audioContext.decodeAudioData(request.response, (buffer) => renderGameplayScreen(buffer));
        }
        request.send();
      }

      loadSound(songs[i]);

      let keepRemoving = true;
      while(keepRemoving){
        for (let i = 0; i < 3; i++) {
          let trackArt = document.getElementById(arts[i]);
          let newBack = document.getElementById("back");
          if(trackArt) trackArt.remove();
          if(newBack) newBack.remove();
          if(!trackArt && !newBack) keepRemoving = false;
          
        }
      }
    });
    
  }
};