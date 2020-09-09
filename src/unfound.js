import { GameLoop, init, initPointer, track, on, emit } from 'kontra';
import { BlockTile } from './tile';

let tiles = new Map();
let transitions = new Map();
let activeWorkers = 0;
let idleWorkers = 4;
let stateToStore = [];

init();
initPointer();

on('askForChoice', askForChoice);
on('choose', choose);
on('transition', transition);
on('endTransition', endTransition);

function localStorageSetup() {
    const url = window.location.href;
    let initialStates;

    if(url.indexOf('clear') != -1)
        localStorage.clear();
    if(localStorage.getItem("unfound")) {
        initialStates = JSON.parse(localStorage.getItem("unfound"));
    }
    else {
        initialStates = [
            {x: 0, y: 0, state: 'farm'},
            {x: 0, y: 1, state: 'lw'},
            {x: 0, y: 2, state: 'lw'},
            {x: 0, y: 3, state: 'lw'},
            {x: 0, y: 4, state: 'lw'},
            {x: 0, y: 5, state: 'lw'},
            {x: 0, y: 6, state: 'lw'},
            {x: 0, y: 7, state: 'lw'},
        ];
    }
    
    for(const tileDef of initialStates ) {
        let tile = new BlockTile({
            x: tileDef.x * 50,
            y: tileDef.y * 50,
            width: 50,
            height: 50,
            state: tileDef.state
        });
        track(tile);
        tiles.set(`${tile.x},${tile.y}`, tile);
    }
        
}

function askForChoice(x, y) {
    // todo ask the player which transition to make
    console.log(`choosing for ${x}, ${y}`);
    const tile = tiles.get(`${x},${y}`);
    // TODO handle the case where there are multiple transition choices
    if(tile.nextState instanceof Array) {
        const picker = document.getElementById('pick-build');
        picker.style.visibility = '';
        const choices = document.getElementById('choices');
        tile.nextState.forEach(nextState => {
            let choice = document.createElement('li');
            choice.className = 'choice';
            choice.textContent = nextState;
            choice.onclick = function() {
                emit('choose', x, y, nextState);
            };
            choices.appendChild(choice);
        });
    }
}

function choose(x, y, state) {
    // Hide the picker
    document.getElementById('pick-build').style.visibility = 'hidden';

    // make the transition
    // first set the chosen state
    const tile = tiles.get(`${x},${y}`);
    tile.nextState = state;
    // then send the transition event
    emit('transition', x, y);
}

function transition(x, y) {
    console.log(`transitioning ${x}, ${y}`);
    const transition = transitions.get(`${x},${y}`);
    console.log(transition);
    if(transition) {
        alert('action already in process');
    }
    else if(idleWorkers > 0) {
        const tile = tiles.get(`${x},${y}`);
        let resourceCount = Number.parseInt(window.localStorage.getItem(tile.resource), 10);

        if (!resourceCount || //This is our first transition and localStorage is empty
            (resourceCount && // There are some resources, so we check if we have enough
                (resourceCount + tile.resourceChange) >= 0)) {
            
            activeWorkers = activeWorkers + 1;
            idleWorkers = idleWorkers - 1;
            tile.toUpdate = true;
            transitions.set(`${x},${y}`,tile.nextState);
        }
        else alert('insufficient resources');
    }
    else alert('no available workers');
}

function endTransition(x, y) {
    console.log(`finishing transition ${x}, ${y}`);
    transitions.delete(`${x},${y}`);
    idleWorkers = idleWorkers + 1;
    activeWorkers = activeWorkers - 1;
}

let loop = GameLoop({
    fps: 1,
    update: function () {
        stateToStore = [];
        const messages = document.getElementsByClassName('transitionMessage');
        for (const message of messages) {
            message.remove();
        }
        tiles.forEach(tile => {
            tile.update();
            if (tile.transitionMessage) {
                let status = document.createElement('li');
                status.className = 'transitionMessage';
                status.textContent = tile.transitionMessage;
                statuses.appendChild(status);
            }
            stateToStore.push({x: tile.x / 50, y: tile.y / 50, state: tile.state});
        })
        localStorage.setItem("unfound",JSON.stringify(stateToStore));
    },
    render: function () {
        document.getElementById('lumber').innerHTML = localStorage.getItem('lumber');
        document.getElementById('idle').innerHTML = idleWorkers;

        tiles.forEach(tile => tile.render());
    }
});

localStorageSetup();

loop.start();