import './styles/main.scss';
import './scripts/play';

window.addEventListener("DOMContentLoaded", () => {
  //play.js
  // const canvas = document.createElement("canvas");
  // canvas.id = "canvas";
  const canvas = document.getElementById("canvas");
  canvas.style.backgroundColor = "white";
  // const screen = document.getElementById("screen");
  // screen.appendChild(canvas);
  let c = canvas.getContext("2d");

  c.beginPath();
  // c.lineWidth = 10;
  c.arc(300, 300, 30, 0, Math.PI * 2, false);
  // c.strokeStyle = "#065675";
  c.strokeStyle = "blue";
  c.stroke();
});