import { printBeat } from "../game_logic/beat";

export const loadSound = (songFile, goalPos, goalKeys, pressedKeys, c, totalScore, totalNotes, paused) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  function playSound(song, delay) {
    const source = audioContext.createBufferSource();
    source.buffer = song;

    let analyzerInfo;

    const gainNode = audioContext.createGain();
    if(delay > 3){
      appendVolumeControl(gainNode);
      source.connect(gainNode).connect(audioContext.destination);
    } else {
      gainNode.gain.value = 0.01;
      analyzerInfo = appendAnalyzer();
      const analyzer = analyzerInfo[0];
      source.connect(gainNode).connect(analyzer).connect(audioContext.destination);
    }

    source.start(delay);
    if (delay === 3) return analyzerInfo;
  }

  function appendVolumeControl(gainNode){
    const volumeBar = document.createElement("input");
    volumeBar.type = "range";
    volumeBar.id = "volume";
    volumeBar.setAttribute("min", "0");
    volumeBar.setAttribute("max", "10");
    volumeBar.setAttribute("value", "2");
    volumeBar.setAttribute("step", "0.2");
    document.body.appendChild(volumeBar);

    const volumeControl = document.querySelector('#volume');
    volumeControl.addEventListener('input', function () {
      gainNode.gain.value = this.value;
    }, false);
  }

  function appendAnalyzer() {
    //analyze audio data  
    const analyzer = audioContext.createAnalyser();
    analyzer.minDecibels = -90;
    analyzer.maxDecibels = -10;

    analyzer.fftSize = 256;
    var bufferLength = analyzer.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    return [analyzer, dataArray];
  }

  let tyme = Date.now();

  class BeatCreator {
    constructor(analyzerInfo) {
      this.analyzer = analyzerInfo[0];
      this.dataArray = analyzerInfo[1];
      this.wave = [];
    }

    update() {
      let bass = this.dataArray.reduce((a, b) => a + b, 0);
      let ave = this.wave.slice(Math.max(this.wave.length - 51,0)).reduce((a, b) => a + b, 0) / 50;
      let waited = Date.now() - tyme;

      // if (bass > 1000 && waited > 500) {
      if (bass / ave > 1.25 && waited > 500) {
        printBeat(goalPos, goalKeys, paused, pressedKeys, c, totalScore, totalNotes);
        tyme = Date.now();
      }
      if(totalNotes.misses > 4){
        if (audioContext.state !== "closed") audioContext.close();
      }
      // if (bass > 10500 && waited > 500) {
      //   printBeat(goalPos, goalKeys, paused, pressedKeys, c, totalScore, totalNotes);
      //   tyme = Date.now();
      // }
      this.wave.push(bass);
      this.draw();
    }

    draw() {
      this.analyzer.getByteFrequencyData(this.dataArray);  
    }
  }

  let back = document.getElementById("back");
  back.addEventListener("click", () => {
    if (audioContext.state !== "closed") audioContext.close();
  });

  addEventListener("keypress", (e) => {
    if (e.keyCode === 32) {
      if (audioContext.state !== "closed") audioContext.close();
    }
  });

  let analyzerInfo = playSound(songFile, 3);
  playSound(songFile, 4.48);
  // playSound(songFile, 4.6);
  return new BeatCreator(analyzerInfo);
};