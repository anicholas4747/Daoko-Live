export const addScore = (totalScore, finishTime) => {
  const screen = document.getElementById("screen");
  const scoreCanvas = document.createElement("canvas");
  scoreCanvas.width = innerWidth;
  scoreCanvas.height = innerHeight;
  scoreCanvas.classList.add("canvas");
  scoreCanvas.id = "score-canvas";
  screen.appendChild(scoreCanvas);
  const c = scoreCanvas.getContext('2d');
  
  class Score {
    constructor() {
      this.tyme = Date.now();
    }

    update() {
      this.draw();
    }

    draw() {

      // count down
      c.fillStyle = "#DB0700";
      c.font = "60px Arial";
      if (Date.now() - this.tyme < 1000) {
        c.fillStyle = "#EEE";
        c.fillRect(innerWidth / 2 - 125, 75, 300, 75);
        c.fill();
        c.fillStyle = "#DB0700";
        c.fillText("3", innerWidth / 2, 125);
      } else if (Date.now() - this.tyme < 2000) {
        c.fillStyle = "#EEE";
        c.fillRect(innerWidth / 2 - 125, 75, 300, 75);
        c.fill();
        c.fillStyle = "#DB0700";
        c.fillText("2", innerWidth / 2, 125);
      } else if (Date.now() - this.tyme < 3000) {
        c.fillStyle = "#EEE";
        c.fillRect(innerWidth / 2 - 125, 75, 300, 75);
        c.fill();
        c.fillStyle = "#DB0700";
        c.fillText("1", innerWidth / 2, 125);
      } else if (Date.now() - this.tyme < 4000) {
        c.fillStyle = "#EEE";
        c.fillRect(innerWidth / 2 - 125, 75, 300, 75);
        c.fill();
        c.fillStyle = "#DB0700";
        c.fillText("START", innerWidth / 2.5, 125);
      } else if (Date.now() - this.tyme < 4500) {
        c.fillStyle = "#EEE";
        c.fillRect(innerWidth / 2 - 200, 75, 400, 75);
        c.fill();
      } else {
        // game over
        let gameOver = (Date.now() - (finishTime - 2000)) > 25;
        if (gameOver) {
          c.beginPath();
          c.fillStyle = "#DB0700";
          c.font = "60px Arial";
          c.fillText("SONG CLEARED", innerWidth / 3.5, innerHeight / 2.5);
        }
  
        // score
        let gradientScore = c.createLinearGradient(0, 0, 1100, 0);
        gradientScore.addColorStop(0, "#FFC513");
        gradientScore.addColorStop(0.5, "#85BDB6");
        gradientScore.addColorStop(1, "#DB0700");
  
        c.beginPath();
        c.fillStyle = "#DDD";
        c.fillRect(50, 100, innerWidth - 150, 40);
        c.fill();
        
        c.beginPath();
        c.fillStyle = gradientScore;
        c.fillRect(50, 100, totalScore.score * 1.15, 40);
        c.fill();
      }

    }
  }

  return new Score();
};