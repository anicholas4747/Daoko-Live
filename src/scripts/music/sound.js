import { printBeat } from "../game_logic/beat";
import { init } from "../flex/mouse_tracking";

export const loadSound = (songFile, goalPos, goalKeys, pressedKeys, c, totalScore, totalMisses, paused) => {
  // for legacy browsers
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioContext = new AudioContext();

  const screen = document.getElementById("screen");
  const song = document.createElement("audio");
    song.src = songFile;

  document.body.appendChild(song);

  // get the audio element
  const audioElement = document.querySelector('audio');

  // pass it into the audio context
  const track = audioContext.createMediaElementSource(audioElement);

  const button = document.createElement("button");
  button.id = "play-button";
  button.setAttribute("data-playing", true);
  button.setAttribute("role", "switch");
  button.setAttribute("aria-checked", false);
  button.textContent = "Play/Pause";
  document.body.appendChild(button);

  //analyze audio data  
  const analyzer = audioContext.createAnalyser();
  analyzer.minDecibels = -90;
  analyzer.maxDecibels = -10;

  analyzer.fftSize = 256;
  var bufferLength = analyzer.frequencyBinCount;

  var dataArray = new Uint8Array(bufferLength);

  const gainNode = audioContext.createGain();

  const volumeBar = document.createElement("input");
  volumeBar.type = "range";
  volumeBar.id = "volume";
  volumeBar.setAttribute("min" , "0");
  volumeBar.setAttribute("max" , "10");
  volumeBar.setAttribute("value" , "2");
  volumeBar.setAttribute("step" , "0.2");

  document.body.appendChild(volumeBar);

  const volumeControl = document.querySelector('#volume');

  volumeControl.addEventListener('input', function () {
    gainNode.gain.value = this.value;
  }, false);

  // const delay = audioContext.createDelay(3);

  track.connect(gainNode).connect(analyzer).connect(audioContext.destination);

  const playButton = document.getElementById("play-button");

  const  pausePlayCB = function () {

      // check if context is in suspended state (autoplay policy)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }


      // play or pause track depending on state
      if (playButton.dataset.playing === 'false') {
        audioElement.play();
        paused.paused = false;
        playButton.dataset.playing = 'true';
      } else if (playButton.dataset.playing === 'true') {
        audioElement.pause();
        paused.paused = true;
        playButton.dataset.playing = 'false';
      }

    };

  playButton.addEventListener('click', pausePlayCB);
  addEventListener("keypress", (e) => {
    if(e.keyCode === 32){
      pausePlayCB();
    }
  });

  playButton.setAttribute("display","none");

  let tyme = Date.now();

  class BeatCreator {
    constructor(){
      
    }

    update(){
      let bass = dataArray.reduce((a, b) => a + b, 0);
      let waited = Date.now() - tyme;

      if (bass > 10500 && waited > 600) {
        printBeat(goalPos, goalKeys, paused, pressedKeys, c, totalScore, totalMisses);
        tyme = Date.now();
      }

      // if (bass > 10500) {
      //   printBeat(goalPos, goalKeys, paused, pressedKeys, c, totalScore);
      //   tyme = Date.now();
      // }
      this.draw();
    }
    
    draw(){
      analyzer.getByteFrequencyData(dataArray);
    }
  }

  audioElement.play();
  return new BeatCreator();
}