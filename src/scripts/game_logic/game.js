class Game{
  constructor(beats, mode){
    this.beatmap = [];
    this.mode = mode;
    this.populateBeatmap(beats);
    this.misses = 0;
  }

  populateBeatmap(beats){
    beats.forEach((bt) => {
      console.log(bt);
      originPos = [innerWidth / 2, innerHeight / 3];

      this.beatmap.push(new Beat(originPos, bt.key, bt.timestamp, bt.hold));
    });
  }

  gameover(){
    let conditionsEasyMode = this.mode === "e" && this.misses > 15;
    let conditionsMedMode = this.mode === "m" && this.misses > 10;
    let conditionsHardMode = this.mode === "h" && this.misses > 5;
    let songOver = this.beatmap.length === 0;

    if(songOver || conditionsEasyMode || conditionsMedMode || conditionsHardMode){
      return true;
    } else {
      return false;
    }
  }
}