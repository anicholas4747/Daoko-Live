const canvas = document.getElementsByClassName("canvas")[0];
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: 0,
  y: 0
};

let clicked = false;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('mousedown', (event) => {
  clicked = true;
});

addEventListener('mouseup', (event) => {
  clicked = false;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

export class MouseTracker {
  constructor(x, y, radius){
    this.colorOptions = ["#85BDB6", "#DB0700", "#FFC513", "#EFFBFF", "#579CC2"];

    this.origX = x;
    this.origY = y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = this.colorOptions[Math.floor(Math.random() * 5)];
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = this.randInt(1, 4) / this.randInt(100,150);
    this.distanceFromCenter = this.randInt(55, 177);
    this.lastMouse = {
      x: this.origX,
      y: this.origY,
    };
  }

  randInt(low,high){
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  update(){

    const lastPoint = {
      x: this.x,
      y: this.y
    };
    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    if(clicked) {
      this.x = this.lastMouse.x;
      this.y = this.lastMouse.y;
    } else {
      this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
      this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    }
    
    this.draw(lastPoint);

  }

  draw(lastPoint){
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }
}

let liddleBuddies = [];

export const init = () => {
  liddleBuddies = [];
  for(let i = 0; i < 200; i++){
    let radius = Math.floor(Math.random() * (7 - 3 + 1) + 3);
    liddleBuddies.push(new MouseTracker(1000, 500, radius));
  }
};

// Animation Loop
export const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255,255,255,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  liddleBuddies.forEach(bud => {
    bud.update();
  });
};

export const stopBeingFancy = () => {
  cancelAnimationFrame();
};
