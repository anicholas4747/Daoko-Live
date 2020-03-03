let i = 0;
for (let r = 100; r < 255; r += 51) {
  for (let g = 100; g < 255; g += 51) {
    for (let b = 100; b < 255; b += 51) {
      let circle = document.createElement("span");
      circle.classList.add("circles");
      circle.style.borderColor = `rgba(${r},${g},${b},0.3)`;
      circle.style.height = `${20 + (i * 10)}px`;
      circle.style.width = `${20 + (i * 10)}px`;
      circle.style.animationDelay = `-${i}s`;
      circle.style.top = `${9 + i}%`;
      circle.style.left = `${9 + i}%`;
      screen.appendChild(circle);

      i = i + 0.5;
    }
  }
}