
export const populateGoals = (goalPos, goalKeys, c, pressedKeys, totalScore, totalNotes, tutorial) => {
  class Goal {
    constructor(key, pos){
      this.key = key;
      this.x = pos[0];
      this.y = pos[1];
    }
    
    update(){
      this.draw(pressedKeys[this.key]);
    }
    
    draw(held){

      if(!tutorial){
        // Rank
        let rank, font, fill;
        if (totalScore.score * 100 === 0) {
          rank = "-";
          font = "30px Arial";
          fill = "#85BDB6";
        } else if (totalScore.score * 100 > 0 && totalScore.score * 100 <= 20000) {
          rank = "D";
          font = "30px Arial";
          fill = "#85BDB6";
        } else if (totalScore.score * 100 > 20000 && totalScore.score * 100 <= 35000) {
          rank = "C";
          font = "30px Arial";
          fill = "#85BDB6";
        } else if (totalScore.score * 100 > 35000 && totalScore.score * 100 <= 50000) {
          rank = "B";
          font = "40px Arial";
          fill = "#85BDB6";
        } else if (totalScore.score * 100 > 50000 && totalScore.score * 100 <= 70000) {
          rank = "A";
          font = "50px Arial";
          fill = "#FFC513";
        } else if (totalScore.score * 100 > 70000){
          rank = "S";
          font = "60px Arial";
          fill = "#DB0700";
        }
  
        c.fillStyle = "#85BDB6";
        c.font = "30px Arial";
        if (totalScore) c.fillText(`Rank: `, 75, 200);
        c.fillStyle = fill;
        c.font = font;
        if (totalScore) c.fillText(`${rank}`, 175, 200);
        
        // Score
        c.fillStyle = "#FFC513";
        c.font = "30px Arial";
        if (totalScore) c.fillText(`Score: ${totalScore.score * 100}`, (innerWidth / 2) - 75, 200);
        
        // Misses
        c.fillStyle = "#DB0700";
        c.font = "30px Arial";
        if (totalScore) c.fillText(`Misses: ${totalNotes.misses}`, innerWidth - 250, 200);
      }

      // actual circles
      c.beginPath();
      c.arc(this.x, this.y, 50, 0, Math.PI * 2);
      c.lineWidth = 15;
      c.strokeStyle = "#85BDB6";
      c.stroke();

      c.fillStyle = "#85BDB6";
      c.font = "30px Arial";
      c.fillText(this.key.toUpperCase(), this.x, this.y * 0.8);

      let gradient = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, 50);
      gradient.addColorStop(0, "#FFC513");
      gradient.addColorStop(1, "#EFFBFF");
      const fillStyleClicked = held ? gradient : "#EEE";

      c.fillStyle = fillStyleClicked;
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