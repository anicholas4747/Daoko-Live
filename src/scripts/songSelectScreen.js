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

  back.addEventListener("click", () => {
    newCanvas.remove();
    back.remove();
    trackArt.remove();
    renderHomeScreen();
  });

  const c = newCanvas.getContext('2d');
  newCanvas.width = innerWidth;
  newCanvas.height = innerHeight;

  // c.fillRect(newCanvas.width / 2 - 75, newCanvas.height / 2 - 75,150, 150);

  const trackArt = document.createElement("img");
  trackArt.classList.add("track-art");
  trackArt.src = "../../assets/images/trackart/mememe.png";
  document.body.appendChild(trackArt);

  trackArt.addEventListener("click", () => {
    renderGameplayScreen();
    trackArt.remove();
    back.remove();
  });
};