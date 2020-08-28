import { init, initPointer, getPointer, Sprite, GameLoop, GameObject, onPointerDown, track } from 'kontra';
import { BlockTile } from './tile';
import { Transition } from './transition';
import { tileStates } from './tile-states';

init();
initPointer();

const localStorage = window.localStorage;
localStorage.setItem("message", "message here");

let tiles = [];
let messages = [];

let i, j;
for (i = 0; i < 100; i++) {
  for (j = 0; j < 100; j++) {
    let tile = new BlockTile({
      x: i * 50,
      y: j * 50,
      width: 50,
      height: 50,
      fillStyle: tileStates.get('lightlyWooded').fillStyle,
      nextTransition: tileStates.get('lightlyWooded').nextTransition
    });
    track(tile);
    tiles.push(tile);
  }
}

let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    messages = [];
    for (const tile of tiles) {
      tile.update();
      if (tile.transitionMessage) {
        messages.push(tile.transitionMessage);
        window.localStorage.setItem("message", tile.transitionMessage);
      }
    }
    document.getElementById("message").innerHTML = messages;
  },
  render: function () { // render the game state
    for (const tile of tiles) tile.render();
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
      runTimeMs: 30000,
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
      runTimeMs: 5000,
      start: new Date(),
      resourcesGathered: 3,
      nextState: null
    })
  });
}

loop.start();    // start the game
