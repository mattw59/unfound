import { init, initPointer, getPointer, Sprite, GameLoop, GameObject, onPointerDown, track } from 'kontra';
import { BlockTile } from './tile';

let { canvas } = init();
initPointer();
let count = 0;  

let tiles = [];
let i, j;
for (i = 0; i < 10; i++) {
  for(j = 0; j < 10; j++) {
    let tile = new BlockTile({
      x: i * 50,//x: 40 * i,        // starting x,y position of the sprite
      y: j * 50, //Math.sin(60 * Math.PI / 180) * 40 * j,
      color: 'green',  // fill color of the sprite rectangle
      width: 50,     // width and height of the sprite rectangle
      height: 50//,
      // dx: 2          // move the sprite 2px to the right every frame
    });
    track(tile);
    tiles.push(tile);  
  }
}


let loop = GameLoop({  // create the main game loop
  fps: 1,
  update: function () { // update the game state
    for (const tile of tiles) tile.update();
  },
  render: function () { // render the game state
    for (const tile of tiles) {

      tile.render();
    }
  }
});

loop.start();    // start the game
