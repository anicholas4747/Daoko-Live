export const addScore = (totalScore) => {
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
    }

    update() {
      this.draw();
    }

    draw() {
      // score
      let gradientScore = c.createLinearGradient(0, 0, 1100, 0);
      gradientScore.addColorStop(0, "#FFC513");
      gradientScore.addColorStop(0.5, "#85BDB6");
      gradientScore.addColorStop(1, "#DB0700");

      c.beginPath();
      c.fillRect(50, 100, innerWidth - 150, 40);
      c.fillStyle = gradientScore;
      c.fill();
      
      c.beginPath();
      c.fillRect(50, 100, totalScore.score * 1.15, 40);
      c.fillStyle = "#DDD";
      c.fill();
    }
  }

  return new Score();
};