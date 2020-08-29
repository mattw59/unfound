import { init, initPointer, GameLoop, track } from 'kontra';
import { BlockTile } from './tile';
import { tileStates } from './tile-states';

init();
initPointer();

let tiles = [];
let messages = [];

let i, j;
for (i = 0; i < 5; i++) {
  for (j = 0; j < 5; j++) {
    let tile = new BlockTile({
      x: i * 50,
      y: j * 50,
      width: 50,
      height: 50,
      state: 'lightlyWooded'
    });
    track(tile);
    tiles.push(tile);
  }
}

let loop = GameLoop({
  fps: 1,
  update: function () {
    let statuses = document.getElementById('statuses');
    while (statuses.lastElementChild) {
      statuses.removeChild(statuses.lastElementChild);
    }
    for (const tile of tiles) {
      tile.update();
      if (tile.transitionMessage) {
        let status = document.createElement('li');
        status.textContent = tile.transitionMessage;
        statuses.appendChild(status);
      }
    }
    document.getElementById('lumber').innerHTML = localStorage.getItem('lumber');
  },
  render: function () {
    for (const tile of tiles) tile.render();
  }
});

loop.start();