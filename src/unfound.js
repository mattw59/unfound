import { GameLoop, init, initPointer, track, on, emit } from 'kontra';
import { BlockTile } from './tile';
import { missions } from './missions.js';

let tiles = new Map();
let transitions = new Map();
let activeWorkers = 0;
let idleWorkers = 4;
let stateToStore = [];
let activeMission = 0;

init();
initPointer();

on('askForChoice', askForChoice);
on('choose', choose);
on('transition', transition);
on('endTransition', endTransition);

function initLocalStorage() {
    const url = window.location.href;
    let initialStates;

    if(url.indexOf('clear') != -1) {
        localStorage.clear();
    }
    if(!localStorage.getItem("unfound.lumber"))
        localStorage.setItem("unfound.lumber", 0);
    if(!localStorage.getItem("unfound.food"))
        localStorage.setItem("unfound.food", 0);
    if(!localStorage.getItem("unfound.coin"))
        localStorage.setItem("unfound.coin", 0);
    if(!localStorage.getItem("unfound.activeMission"))
        localStorage.setItem("unfound.activeMission", activeMission);
    if(localStorage.getItem("unfound")) {
        initialStates = JSON.parse(localStorage.getItem("unfound"));
    }
    else {
        initialStates = [
            {x: 0, y: 0, state: 'lw'},
            {x: 0, y: 1, state: 'lw'},
            {x: 0, y: 2, state: 'lw'},
            {x: 0, y: 3, state: 'lw'},
            {x: 0, y: 4, state: 'lw'},
            {x: 0, y: 5, state: 'lw'},
            {x: 0, y: 6, state: 'lw'},
            {x: 0, y: 7, state: 'lw'},
            {x: 1, y: 0, state: 'lw'},
            {x: 1, y: 1, state: 'lw'},
            {x: 1, y: 2, state: 'lw'},
            {x: 1, y: 3, state: 'lw'},
            {x: 1, y: 4, state: 'lw'},
            {x: 1, y: 5, state: 'lw'},
            {x: 1, y: 6, state: 'lw'},
            {x: 1, y: 7, state: 'lw'},
            {x: 2, y: 0, state: 'lw'},
            {x: 2, y: 1, state: 'lw'},
            {x: 2, y: 2, state: 'lw'},
            {x: 2, y: 3, state: 'lw'},
            {x: 2, y: 4, state: 'lw'},
            {x: 2, y: 5, state: 'lw'},
            {x: 2, y: 6, state: 'lw'},
            {x: 2, y: 7, state: 'lw'},
            {x: 3, y: 0, state: 'lw'},
            {x: 3, y: 1, state: 'lw'},
            {x: 3, y: 2, state: 'lw'},
            {x: 3, y: 3, state: 'lw'},
            {x: 3, y: 4, state: 'lw'},
            {x: 3, y: 5, state: 'lw'},
            {x: 3, y: 6, state: 'lw'},
            {x: 3, y: 7, state: 'lw'},
            {x: 4, y: 0, state: 'farm'},
            {x: 4, y: 1, state: 'harvest'},
            {x: 4, y: 2, state: 'barn'},
            {x: 4, y: 3, state: 'lw'},
            {x: 4, y: 4, state: 'lw'},
            {x: 4, y: 5, state: 'lw'},
            {x: 4, y: 6, state: 'lw'},
            {x: 4, y: 7, state: 'lw'},
            {x: 5, y: 0, state: 'water'},
            {x: 5, y: 1, state: 'cleared'},
            {x: 5, y: 2, state: 'lw'},
            {x: 5, y: 3, state: 'lw'},
            {x: 5, y: 4, state: 'lw'},
            {x: 5, y: 5, state: 'lw'},
            {x: 5, y: 6, state: 'lw'},
            {x: 5, y: 7, state: 'lw'},
            {x: 6, y: 0, state: 'water'},
            {x: 6, y: 1, state: 'water'},
            {x: 6, y: 2, state: 'water'},
            {x: 6, y: 3, state: 'water'},
            {x: 6, y: 4, state: 'water'},
            {x: 6, y: 5, state: 'water'},
            {x: 6, y: 6, state: 'water'},
            {x: 6, y: 7, state: 'water'},
            {x: 7, y: 0, state: 'water'},
            {x: 7, y: 1, state: 'cleared'},
            {x: 7, y: 2, state: 'lw'},
            {x: 7, y: 3, state: 'lw'},
            {x: 7, y: 4, state: 'lw'},
            {x: 7, y: 5, state: 'lw'},
            {x: 7, y: 6, state: 'lw'},
            {x: 7, y: 7, state: 'lw'},
            {x: 8, y: 0, state: 'cleared'},
            {x: 8, y: 1, state: 'cleared'},
            {x: 8, y: 2, state: 'lw'},
            {x: 8, y: 3, state: 'lw'},
            {x: 8, y: 4, state: 'lw'},
            {x: 8, y: 5, state: 'lw'},
            {x: 8, y: 6, state: 'lw'},
            {x: 8, y: 7, state: 'lw'},
            {x: 9, y: 0, state: 'lw'},
            {x: 9, y: 1, state: 'lw'},
            {x: 9, y: 2, state: 'lw'},
            {x: 9, y: 3, state: 'lw'},
            {x: 9, y: 4, state: 'lw'},
            {x: 9, y: 5, state: 'lw'},
            {x: 9, y: 6, state: 'lw'},
            {x: 9, y: 7, state: 'lw'},
            {x: 10, y: 0, state: 'lw'},
            {x: 10, y: 1, state: 'lw'},
            {x: 10, y: 2, state: 'lw'},
            {x: 10, y: 3, state: 'lw'},
            {x: 10, y: 4, state: 'lw'},
            {x: 10, y: 5, state: 'lw'},
            {x: 10, y: 6, state: 'lw'},
            {x: 10, y: 7, state: 'lw'},
            {x: 11, y: 0, state: 'lw'},
            {x: 11, y: 1, state: 'lw'},
            {x: 11, y: 2, state: 'lw'},
            {x: 11, y: 3, state: 'lw'},
            {x: 11, y: 4, state: 'lw'},
            {x: 11, y: 5, state: 'lw'},
            {x: 11, y: 6, state: 'lw'},
            {x: 11, y: 7, state: 'lw'},
            {x: 12, y: 0, state: 'lw'},
            {x: 12, y: 1, state: 'lw'},
            {x: 12, y: 2, state: 'lw'},
            {x: 12, y: 3, state: 'lw'},
            {x: 12, y: 4, state: 'lw'},
            {x: 12, y: 5, state: 'lw'},
            {x: 12, y: 6, state: 'lw'},
            {x: 12, y: 7, state: 'lw'},
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
    const tile = tiles.get(`${x},${y}`);

    let pickerChoices = document.getElementsByClassName('choice');
    while(pickerChoices.length > 0) {
        let choice = pickerChoices.item(pickerChoices.length - 1);
        choice.remove();
    }
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
    tile.transitionAction = `builing ${state}`;
    // then send the transition event
    emit('transition', x, y);
}

function transition(x, y) {
    const transition = transitions.get(`${x},${y}`);
    if(transition) {
        alert('action already in process');
    }
    else if(idleWorkers > 0) {
        const tile = tiles.get(`${x},${y}`);
        let resourceCount = Number.parseInt(window.localStorage.getItem(`unfound.${tile.resource}`), 10);

        if ((!resourceCount && tile.resourceChange > 0) || //This is our first transition and localStorage is empty, so we only allow gathering
            (resourceCount && // There are some resources, so we check if we have enough
                (resourceCount + tile.resourceChange) >= 0)) {

            // spend resources now, gather later
            if (tile.resourceChange < 0) {
                if(resourceCount)
                    resourceCount = resourceCount + tile.resourceChange;
                else resourceCount = tile.resourceChange;
                window.localStorage.setItem(`unfound.${tile.resource}`, `${resourceCount}`);

            }
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
    transitions.delete(`${x},${y}`);
    idleWorkers = idleWorkers + 1;
    activeWorkers = activeWorkers - 1;
}

let loop = GameLoop({
    fps: 1,
    update: function () {
        const statusesElement = document.getElementById('statuses');
        stateToStore = [];
        const messages = document.getElementsByClassName('transitionMessage');
        while(messages.length > 0) {
            let message = messages.item(messages.length - 1);
            message.remove();   
        }
        const missionMessages = document.getElementsByClassName('missionMessage');
        while(missionMessages.length > 0) {
            let message = missionMessages.item(missionMessages.length - 1);
            message.remove();   
        }
        tiles.forEach(tile => {
            tile.update();
            if (tile.transitionMessage) {
                let status = document.createElement('li');
                status.className = 'transitionMessage';
                status.textContent = tile.transitionMessage;
                statusesElement.appendChild(status);
            }
            stateToStore.push({x: tile.x / 50, y: tile.y / 50, state: tile.state});
        });

        let mission = missions[activeMission];
        if(mission) {
            let actualResource = Number.parseInt(window.localStorage.getItem(`unfound.${mission.resource}`), 10);
            if(actualResource < mission.count) {
                let missionElement = document.createElement('li'); 
                missionElement.className = 'missionMessage';
                missionElement.textContent = mission.message;
                statuses.appendChild(missionElement);
            }
            else {
                activeMission = activeMission + 1;
            }
        }
        else {
            let restart = confirm('YOU WIN! Play again?')
            if(restart)
                location.assign(location.href+"?clear");
        }
        localStorage.setItem("unfound.activeMission", activeMission);
        localStorage.setItem("unfound",JSON.stringify(stateToStore));

        updateWorkerCount();
        useFood();
    },
    render: function () {
        document.getElementById('lumber').innerHTML = localStorage.getItem('unfound.lumber');
        document.getElementById('food').innerHTML = localStorage.getItem('unfound.food');
        document.getElementById('coin').innerHTML = localStorage.getItem('unfound.coin');
        document.getElementById('idle').innerHTML = idleWorkers;
        document.getElementById('residents').innerHTML = (activeWorkers + idleWorkers);

        tiles.forEach(tile => tile.render());
    }
});

function updateWorkerCount() {
    // Count the cabins
    const tilesArray = Array.from(tiles.values());

    let reducer = (acc, cur) => {
        if(cur.state === 'cabin')
            acc = acc + 1;
            return acc;
    }
    const cabinCount = tilesArray.reduce(reducer, 0);

    // get the current amount of food on hand
    let food = Number.parseInt(window.localStorage.getItem('unfound.food'), 10);

    // Workers are attracted to your settlment when there is sufficient housing
    // each cabin houses 4 workers
    // 

    let foodCanFeed = Math.floor(food / 10);
    idleWorkers = Math.max(4, Math.min(cabinCount * 4, foodCanFeed)) - activeWorkers;
}

function useFood() {
    let food = Number.parseInt(window.localStorage.getItem('unfound.food'), 10);
    food = Math.max(0, food - 1);
    localStorage.setItem('unfound.food', food);
}

initLocalStorage();

loop.start();