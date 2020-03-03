import './styles/main.css';
import './scripts/play';
import MouseTracker from './scripts/flex/mouse_tracking';

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.style.backgroundColor = "#DDD";
  let c = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;
  
});