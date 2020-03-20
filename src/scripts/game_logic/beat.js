import { popBeats } from "../music/sound";

export const printBeat = (goalPos, goalKeys, paused, pressedKeys, c, totalScore, totalNotes) => {
  class Beat {
    constructor(pos, destination, radius, key, timestamp, hold){
      this.x = pos[0];
      this.y = pos[1];
      this.destX = destination[0];
      this.destY = destination[1];
      this.dx = (this.destX - this.x) / 60;
      this.dy = (this.destY - this.y) / 60;
      this.radius = radius;
      this.key = key;
      this.timestamp = timestamp;
      this.hold = hold;
      this.hit = false;
      this.missed = false;
      this.timer = 0;
      this.result = "";
    }

    update(){
      this.radius = (this.radius < 50) ? this.radius + 1 : this.radius;
      
      this.x += this.dx;
      this.y += this.dy;

      const perfectZone = Math.abs(this.x - this.destX) < 15 && Math.abs(this.y - this.destY) < 15;
      const goodZone = Math.abs(this.x - this.destX) < 25 && Math.abs(this.y - this.destY) < 25;
      const missedZone = (this.y - this.destY) > 25;
      const pressed = pressedKeys[this.key];
      
      if (perfectZone && pressed) totalScore.score += 1;
      if (goodZone && pressed) totalScore.score += 0.5;

      if((perfectZone || goodZone) && pressed) this.hit = true; 
      if (missedZone && !this.hit) this.missed = true; 
      if (this.missed && Math.floor(this.y - this.destY) === 25) totalNotes.misses += 1;
      if (this.result === "") this.result = (perfectZone) ? "PERFECT" : "PERFECT";

      this.draw();
    }

    draw(){
      if (this.missed) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.lineWidth = 10;
        c.strokeStyle = "#DB0700";
        c.stroke();

        if (this.timer < 20){
          c.fillStyle = "#DB0700";
          c.font = "75px Arial";
          c.fillText("MISSED", innerWidth / 2.5, innerHeight / 2);
          this.timer++;
        }
      } else if (!this.hit) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.lineWidth = 10;
        c.strokeStyle = "#85BDB6";
        c.stroke();
      } else if (this.timer < 20){
        c.fillStyle = (this.result === "PERFECT") ? "#FFC513" : "#AAAAAA";
        c.font = "75px Arial";
        c.fillText(this.result, innerWidth / 2.8, innerHeight / 2);
        if(this.timer === 0) totalNotes.hits++;
        this.timer++;
      }
    }
  }

  let randFactor = 0.67;
  
  const beats = [];
  const init = () => {
    let origPos = [innerWidth / 2, innerHeight / 3];

    for (let i = 0; i < 2; i++) {
      if (Math.random() < randFactor && i === 1){
        if (randFactor < 0.05) randFactor = 0.67;
        randFactor -= 0.1;
        continue;
      } else {
        let spot = Math.floor(Math.random() * 6);
        let dest = goalPos[spot];
        let key = goalKeys[spot];
        beats.push(new Beat(origPos, dest, 5, key, 0, false));
      }
    }
  };

  function animate() {
    requestAnimationFrame(animate);
    if (totalNotes.misses > 4) {
      cancelAnimationFrame(animate);
    }
    beats.forEach(el => {
      el.update();
    });
  };

  init();
  animate();
};
