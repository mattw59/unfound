// from https://straker.github.io/kontra/getting-started
import { init, Sprite, GameLoop, GameObject, onPointerDown } from 'kontra';
import { initPointer, getPointer } from 'kontra';

let { canvas } = init();
initPointer();

class Hexagon extends GameObject.class {
  constructor(properties) {
    super(properties);
    this.size = properties.size;
  }

  draw() {

    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
    console.log(`start: x: ${this.x + + this.size * Math.cos(0)}, y: ${this.y + this.size * Math.sin(0)}`);
    // let lineToX = this.x + this.size * Math.cos(2 * Math.PI / 6);
    // let lineToY = this.y + this.size * Math.sin(2 * Math.PI / 6);
    // this.context.lineTo(lineToX, lineToY);
    let i;
    for(i = 1; i <= 6; i++) {
      let lineToX = this.x + this.size * Math.cos(i * 2 * Math.PI / 6);
      let lineToY = this.y + this.size * Math.sin(i * 2 * Math.PI / 6);
      console.log(`i: ${i}, x: ${lineToX}, y: ${lineToY}`);
      this.context.lineTo(lineToX, lineToY);
    }
    this.context.stroke();
  }
}

let tile = new Hexagon({
  x: 100,        // starting x,y position of the sprite
  y: 100,//Math.sin(30 * Math.PI / 180) * 40,
  size: 40,
  color: 'red',  // fill color of the sprite rectangle
  // width: 20,     // width and height of the sprite rectangle
  // height: 40//,
  // dx: 2          // move the sprite 2px to the right every frame
});

let loop = GameLoop({  // create the main game loop
  fps: 1,
  update: function() { // update the game state
    tile.update();
  },
  render: function() { // render the game state
    tile.render();
  }
});

onPointerDown(function(e, object) {
  console.log(getPointer())
  loop.stop();
})

loop.start();    // start the game
