import { popBeats } from "../music/sound";

export const printBeat = (goalPos, goalKeys, paused, pressedKeys, c, totalScore) => {
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
      this.score = 0;
    }

    update(){
      this.radius = (this.radius < 50) ? this.radius + 1 : this.radius;
      
      this.x += this.dx;
      this.y += this.dy;

      const perfectZone = Math.abs(this.x - this.destX) < 10 && Math.abs(this.y - this.destY) < 10;
      const goodZone = Math.abs(this.x - this.destX) < 25 && Math.abs(this.y - this.destY) < 25;
      const pressed = pressedKeys[this.key];
      
      if (perfectZone && pressed) totalScore.score += 1;
      if (goodZone && pressed) totalScore.score += 0.5;

      if((perfectZone || goodZone) && pressed) this.hit = true; 

      this.draw();
    }

    draw(){
      if (!this.hit) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.lineWidth = 10;
        c.strokeStyle = "#85BDB6";
        c.stroke();
      }
    }
  }
  
  const beats = [];
  const init = () => {
    let origPos = [innerWidth / 2, innerHeight / 3];

    for (let i = 0; i < 2; i++) {
      if (Math.random() < 0.67 && i === 1){
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
    if (!paused) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animate);
    }
    // c.clearRect(0, 0, innerWidth, innerHeight);

    beats.forEach(el => {
      el.update();
    });
  };

  init();
  animate();
};
