// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

const screen = document.getElementById("screen");
const song = document.createElement("audio");
song.setAttribute("src", "../../../assets/Songs/Me!Me!Me! Pt. 1 (feat. Daoko) - TeddyLoid.mp3");

document.body.appendChild(song);

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

const button = document.createElement("button");
button.id = "play-button";
button.setAttribute("data-playing", false);
button.setAttribute("role", "switch");
button.setAttribute("aria-checked", false);
button.textContent = "Play/Pause";

const gainNode = audioContext.createGain();

const volumeBar = document.createElement("input");
volumeBar.type = "range";
volumeBar.id = "volume";
volumeBar.setAttribute("min" , "0");
volumeBar.setAttribute("max" , "10");
volumeBar.setAttribute("value" , "2");
volumeBar.setAttribute("step" , "0.5");

document.body.appendChild(button);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(volumeBar);

const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function () {
  gainNode.gain.value = this.value;
}, false);

track.connect(gainNode).connect(audioContext.destination);

const playButton = document.getElementById("play-button");

playButton.addEventListener('click', function () {

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // play or pause track depending on state
  if (this.dataset.playing === 'false') {
    audioElement.play();
    this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }

}, false);