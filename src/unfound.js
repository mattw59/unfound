import { init, initPointer, GameLoop, track } from 'kontra';
import { BlockTile } from './tile';
import { tileStates } from './tile-states';

init();
initPointer();

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
      nextTransition: tileStates.get('lightlyWooded').nextTransition,
      resource: tileStates.get('lightlyWooded').resource
    });
    track(tile);
    tiles.push(tile);
  }
}

let loop = GameLoop({
  update: function () {
    messages = [];
    for (const tile of tiles) {
      tile.update();
      if (tile.transitionMessage) {
        messages.push(tile.transitionMessage);
      }
    }
    document.getElementById("message").innerHTML = messages; // TODO put messages in local storage
    document.getElementById('lumber').innerHTML = localStorage.getItem('lumber');
  },
  render: function () {
    for (const tile of tiles) tile.render();
  }
});

loop.start();