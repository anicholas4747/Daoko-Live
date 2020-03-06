export const addScore = (totalScore, c) => {
  class Score {
    constructor() {
      this.x = (totalScore * (innerWidth * (7 / 8)) / 400);
    }

    update() {
      this.draw();
    }

    draw() {
      c.beginPath();
      let gradient = c.createLinearGradient(0, 0, 170, 0);
      gradient.addColorStop(0, "#FFC513");
      gradient.addColorStop(0.5, "#85BDB6");
      gradient.addColorStop(1, "#DB0700");
      c.fillRect(50, 100, this.x, 40);
      c.fillStyle = gradient;
      c.fill();
    }
  }

  return new Score();
};