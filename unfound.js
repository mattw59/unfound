// from https://straker.github.io/kontra/getting-started
import { init, Sprite, GameLoop, GameObject, onPointerDown } from 'kontra';
import { initPointer, getPointer } from 'kontra';

let { canvas } = init();
initPointer();
let count = 0;

class Hexagon extends Sprite.class {
  constructor(properties) {
    super(properties);
    this.size = properties.size;
  }

  render() {
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 1;
    this.context.beginPath();

    this.context.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
    let i;
    for(i = 1; i <= 4; i++) {
      let lineToX = this.x + this.size * Math.cos(i * 2 * Math.PI / 6);
      let lineToY = this.y + this.size * Math.sin(i * 2 * Math.PI / 6);
      this.context.lineTo(lineToX, lineToY);
    }
    this.context.stroke();
  }
}

let tiles = [];
let i, j;
for(i = 0; i < 10; i++) {
      // console.log(`processing hex at ${i}, ${j}`);
      let tile = new Sprite({
        x: 0 + i*40,//x: 40 * i,        // starting x,y position of the sprite
        y: 0, //Math.sin(60 * Math.PI / 180) * 40 * j,
        size: 40,
        color: 'red',  // fill color of the sprite rectangle
        width: 40,     // width and height of the sprite rectangle
        height: 40//,
        // dx: 2          // move the sprite 2px to the right every frame
      });
      tiles.push(tile);
    // else if(j % 3 == 2) {
    //   let tile = new Hexagon({
    //     x: 40 * i * 2.5,        // starting x,y position of the sprite
    //     y: Math.sin(60 * Math.PI / 180) * 40 * j,
    //     size: 40,
    //     color: 'red',  // fill color of the sprite rectangle
    //     // width: 20,     // width and height of the sprite rectangle
    //     // height: 40//,
    //     // dx: 2          // move the sprite 2px to the right every frame
    //   });
    //   tiles.push(tile);
    // }
}


let loop = GameLoop({  // create the main game loop
  fps: 1,
  update: function() { // update the game state
    for(const tile of tiles) tile.update();
  },
  render: function() { // render the game state
    for(const tile of tiles) {
      
      tile.render();
    }
  }
});

onPointerDown(function(e, object) {
  console.log(getPointer())
  loop.stop();
})

loop.start();    // start the game
