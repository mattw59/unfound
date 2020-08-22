import { init, initPointer, getPointer, Sprite, GameLoop, GameObject, onPointerDown, track } from 'kontra';
import { BlockTile } from './tile';
import { Transition } from './transition';
 
init();
initPointer();

let tiles = [];
let i, j;
for (i = 0; i < 1; i++) {
  for(j = 0; j < 1; j++) {
    let tile = lightlyWooded({
      x: i * 50,
      y: j * 50,
      width: 50,
      height: 50
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


function lightlyWooded(properties) {
  return new BlockTile({
      x: properties.x,
      y: properties.y,
      width: properties.width,
      height: properties.height,
      fillStyle: '#3A8C63',
      nextTransition: new Transition({
          runTimeMs: 60000,
          resourcesGathered: 3,
          nextState: cleared(properties)
      }) 
  });
}

function cleared(properties) {
  return new BlockTile({
    x: properties.x,
    y: properties.y,
    width: properties.width,
    height: properties.height,
    fillStyle: '#1CF689',
    nextTransition: new Transition({
        runTimeMs: 60000,
        start: new Date(),
        resourcesGathered: 3,
        nextState: null
    })
  });
}

loop.start();    // start the game
