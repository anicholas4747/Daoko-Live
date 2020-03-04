class Game{
  constructor(beats, mode){
    this.beatmap = [];
    this.mode = mode;
    this.populateBeatmap(beats);
    this.misses = 0;
  }

  populateBeatmap(beats){
    beats.forEach((el) => {

    });
  }

  gameover(){
    let conditionsHardMode = this.mode === "h" && this.misses > 5;
    if()
  }
}