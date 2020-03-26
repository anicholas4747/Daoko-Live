import { renderSongSelectScreen } from "./songSelectScreen";


export const renderGameOverScreen = (totalNotes, totalScore) => {
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

  const screen = document.getElementById("screen");

  const newCanvas = document.createElement("canvas");
  newCanvas.classList.add("canvas");
  newCanvas.id = "gameOverCanvas";

  const back = document.createElement("button");
  back.textContent = "back to song select";
  back.id = "back";
  document.body.appendChild(back);

  screen.appendChild(newCanvas);

  back.addEventListener("click", () => {
    newCanvas.remove();
    back.remove();
    let selectCanvas = document.getElementById("songSelectCanvas");
    if (selectCanvas) selectCanvas.remove();
    renderSongSelectScreen();
  });

  const c = newCanvas.getContext('2d');
  newCanvas.width = innerWidth;
  newCanvas.height = innerHeight;

  // drawing results to the canvas
  let msg = (totalNotes.misses < 5) ? "SONG CLEARED" : "GAME OVER";
  let where = (totalNotes.misses < 5) ? innerWidth / 2.8 : innerWidth / 2.7;

  c.beginPath();
  c.fillStyle = (totalNotes.misses < 5) ? "#85BDB6" : "#DB0700";
  c.font = "60px Arial";
  c.fillText(msg, where, innerHeight / 2.5);

  if (totalNotes.misses < 5) {
    let rank;
    if (totalScore.score * 100 === 0) {
      rank = "-";
    } else if (totalScore.score * 100 > 0 && totalScore.score * 100 <= 20000) {
      rank = "D";
    } else if (totalScore.score * 100 > 20000 && totalScore.score * 100 <= 35000) {
      rank = "C";
    } else if (totalScore.score * 100 > 35000 && totalScore.score * 100 <= 50000) {
      rank = "B";
    } else if (totalScore.score * 100 > 50000 && totalScore.score * 100 <= 70000) {
      rank = "A";
    } else if (totalScore.score * 100 > 70000) {
      rank = "S";
    }

    c.font = "50px Arial";
    c.fillStyle = "#FFC513";
    c.fillText(`Rank: ${rank}`, innerWidth / 2.2, innerHeight / 2);
    c.fillText(`Score: ${totalScore.score * 100}`, innerWidth / 2.4, innerHeight / 1.7);
    
    c.font = "40px Arial";
    c.fillStyle = "#85BDB6";
    c.fillText(`Hits: ${totalNotes.hits}`, innerWidth / 2.75, innerHeight / 1.4);
    c.fillStyle = "#DB0700";
    c.fillText(`Misses: ${totalNotes.misses}`, innerWidth / 1.8, innerHeight / 1.4);
  }

  if(totalNotes.misses === 0){
    c.font = "50px Arial";
    let gradient = c.createLinearGradient(0, 0, 1100, 0);
    gradient.addColorStop(0, "#FFC513");
    gradient.addColorStop(0.75, "#85BDB6");
    gradient.addColorStop(1, "#DB0700");
    c.fillStyle = gradient;
    c.fillText(`FULL COMBO`, innerWidth / 1.5, 150);
  }


};