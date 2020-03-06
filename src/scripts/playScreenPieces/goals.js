
export const populateGoals = () => {
  const gameplayCanvas = document.getElementById("gameplay-canvas");
  let pressedKeys = [];
  addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 69:
        pressedKeys.push("e");
        return;
      case 70:
        pressedKeys.push("f");
        return;
      case 86:
        pressedKeys.push("v");
        return;
      case 78:
        pressedKeys.push("n");
        return;
      case 74:
        pressedKeys.push("j");
        return;
      case 73:
        pressedKeys.push("i");
        return;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 69:
        pressedKeys = pressedKeys.filter((el) => el !== "e");
        return;
      case 70:
        pressedKeys = pressedKeys.filter((el) => el !== "f");
        return;
      case 86:
        pressedKeys = pressedKeys.filter((el) => el !== "v");
        return;
      case 78:
        pressedKeys = pressedKeys.filter((el) => el !== "n");
        return;
      case 74:
        pressedKeys = pressedKeys.filter((el) => el !== "j");
        return;
      case 73:
        pressedKeys = pressedKeys.filter((el) => el !== "i");
        return;
    }
  });

  const c = gameplayCanvas.getContext('2d');
  gameplayCanvas.width = innerWidth;
  gameplayCanvas.height = innerHeight;

  const goalPos = [
    [gameplayCanvas.width / 6, gameplayCanvas.height / 2],
    [(gameplayCanvas.width / 4) + 20, gameplayCanvas.height * (2 / 3)],
    [(gameplayCanvas.width / 2) - 100, gameplayCanvas.height * (5 / 6)],
    [(gameplayCanvas.width / 2) + 100, gameplayCanvas.height * (5 / 6)],
    [(gameplayCanvas.width * (3 / 4)) - 20, gameplayCanvas.height * (2 / 3)],
    [gameplayCanvas.width * (5 / 6), gameplayCanvas.height / 2],
  ];

  const goalKeys = ["e", "f", "v", "n", "j", "i"];

  class Goal {
    constructor(key, pos){
      this.key = key;
      this.x = pos[0];
      this.y = pos[1];
      this.first = true;
      this.score = 0;
    }
    
    update(){
      this.draw(pressedKeys.includes(this.key));
    }
    
    draw(held){
      c.beginPath();
      c.arc(this.x, this.y, 50, 0, Math.PI * 2);
      c.lineWidth = 10;
      c.strokeStyle = "#85BDB6";
      c.stroke();
      
      let gradient = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, 50);
      gradient.addColorStop(0, "#FFC513");
      gradient.addColorStop(1, "#EFFBFF");
      const fillStyleClicked = (held || this.first) ? gradient : "rgba(255,255,255,0.02)";
      this.first = false;

      c.fillStyle = fillStyleClicked;
      c.fill();

      c.beginPath();
      c.fillRect(40,80,innerWidth * (7/8), 40);
      c.fill();

      c.beginPath();
      c.fillRect(40,80, this.score * ((innerWidth * (7/8)) / 400), 40);
      c.fill();
    }
  }

  const goals = [];
  const init = () => {
    for (let i = 0; i < 6; i++) {
      let pos = goalPos[i];
      let key = goalKeys[i];
      goals.push(new Goal (key, pos));
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    
    goals.forEach(goal => {
      goal.update();
    });
  }


  init();
  animate();
};