import './styles/main.css';
import { renderHomeScreen } from './scripts/homeScreen';
import * as flex from './scripts/flex/mouse_tracking';

document.addEventListener("DOMContentLoaded", () => {

  renderHomeScreen();
  flex.init();
  flex.animate();
});