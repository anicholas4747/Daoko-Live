import { popBeats } from "../music/sound";

export const printBeat = () => {
  const screen = document.getElementById("screen");
  const beatsCanvas = document.createElement("canvas");
  beatsCanvas.classList.add("canvas");
  beatsCanvas.id = "beats-canvas";
  screen.appendChild(beatsCanvas);

  // constbeatCanvas = document.getElementById("beats-canvas");
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

  let paused = false;
  addEventListener("keypress", (e) => {
    if (e.keyCode === 32) {
      if(paused) {
        paused = false;
        animate();
      } else {
        paused = true;
      }
    }
});

  const c =beatsCanvas.getContext('2d');
 beatsCanvas.width = innerWidth;
 beatsCanvas.height = innerHeight;

  const goalPos = [
    [beatsCanvas.width / 6,beatsCanvas.height / 2],
    [(beatsCanvas.width / 4) + 20,beatsCanvas.height * (2 / 3)],
    [(beatsCanvas.width / 2) - 100,beatsCanvas.height * (5 / 6)],
    [(beatsCanvas.width / 2) + 100,beatsCanvas.height * (5 / 6)],
    [(beatsCanvas.width * (3 / 4)) - 20,beatsCanvas.height * (2 / 3)],
    [beatsCanvas.width * (5 / 6),beatsCanvas.height / 2],
  ];

  const goalKeys = ["e", "f", "v", "n", "j", "i"];


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
      const pressed = pressedKeys.includes(this.key);
      
      if(perfectZone && pressed) this.score += 100;
      if(goodZone && pressed) this.score += 50;

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
      } else {
        beatsCanvas.remove();
      }
    }
  }


  const beats = [];
  const init = () => {
    let origPos = [beatsCanvas.width / 2,beatsCanvas.height / 3];

    for (let i = 0; i < 2; i++) {
      if (Math.random() < 0.77 && i === 1){
        continue;
      } else {
        let spot = Math.floor(Math.random() * 6);
        let dest = goalPos[spot];
        let key = goalKeys[spot];
        beats.push(new Beat(origPos, dest, 5, key, 0, false));
      }
    }
  };

  const animate = () => {
    if (!paused) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animate);
    }
    c.clearRect(0,0,innerWidth,innerHeight);

    beats.forEach(bt => {
      bt.update();
    });
  }


  init();
  animate();
};
