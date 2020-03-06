
export const populateGoals = (goalPos, goalKeys, c, pressedKeys) => {
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
      c.fillRect(50, 100, innerWidth * (9 / 10), 40);
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

  init();
  return goals;
};