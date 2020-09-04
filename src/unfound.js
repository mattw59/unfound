import { GameLoop, Sprite, init, initPointer, track } from 'kontra';

init();
initPointer();

let tileStates = new Map();

tileStates.set('lightlyWooded', {
    fillStyle: '#3A8C63',
    resource: 'lumber',
    ticksToRun: 10,
    resourceChange: 3,
    nextState: 'cleared',
    transitionAction: 'clearing wood',
    state: 'lightlyWooded'
});
tileStates.set('cleared', {
    fillStyle: '#1CF689',
    resource: 'lumber',
    ticksToRun: 10,
    resourceChange: -5,
    nextState: 'cabin',
    state: 'cleared'
});
tileStates.set('cabin', {
    fillStyle: 'brown',
    state: 'cabin'
});

class BlockTile extends Sprite.class {

    takeState(state) {
        let stateToTake = tileStates.get(state);
        this.state = stateToTake.state;
        this.fillStyle = stateToTake.fillStyle;
        this.resource = stateToTake.resource;
        this.ticksToRun = stateToTake.ticksToRun;
        this.resourceChange = stateToTake.resourceChange;
        this.nextState = stateToTake.nextState;
        this.initialStyle = stateToTake.fillStyle;
        this.transitionAction = stateToTake.transitionAction;
    }

    constructor(properties) {
        super(properties);
        this.strokeStyle = '1px black';
        this.toUpdate = false;
        this.transitionMessage = properties.transitionMessage;
        this.takeState(properties.state);
    }

    render() {
        switch (this.state) {
            case 'lightlyWooded':
                this.context.beginPath();
                this.context.strokeStyle = this.strokeStyle;
                this.context.rect(this.x, this.y, this.width, this.height);
                this.context.stroke();
                this.context.beginPath();
                this.context.fillStyle = 'brown';
                this.context.rect(this.x + 20, this.y + 30, 10, 20);
                this.context.fill();
                this.context.stroke();
                this.context.beginPath();
                this.context.fillStyle = 'green';
                this.context.arc(this.x + this.width / 2, this.y + this.height / 2, .3 * this.width, 0, 2 * Math.PI);
                this.context.fill();
                this.context.stroke();
                break;
            case 'cleared':
                this.context.beginPath();
                this.context.strokeStyle = this.strokeStyle;
                this.context.fillStyle = this.fillStyle;
                this.context.rect(this.x, this.y, this.width, this.height);
                this.context.stroke();
                this.context.fill();
                break;
            case 'cabin':
                this.context.beginPath();
                this.context.strokeStyle = this.strokeStyle;
                this.context.fillStyle = 'white';
                this.context.moveTo(this.width / 2, 0);
                this.context.lineTo(this.width, 10);
                this.context.lineTo(0, 10);
                this.context.closePath();
                this.context.stroke();
                break;
            default:
                break;
        }
    }

    update() {
        if (this.toUpdate) {
            this.ticksToRun = this.ticksToRun - 1;
            this.transitionMessage = `${this.transitionAction} for ${this.ticksToRun} more s`;
            if (this.ticksToRun === 0) {
                let resourceCount = Number.parseInt(window.localStorage.getItem(this.resource), 10);
                if (resourceCount)
                    resourceCount = resourceCount + this.resourceChange;
                else resourceCount = this.resourceChange;
                window.localStorage.setItem(this.resource, `${resourceCount}`);
                this.takeState(this.nextState);
                this.toUpdate = false;
                idleWorkers = idleWorkers + 1;
                activeWorkers = activeWorkers - 1;
                this.transitionMessage = null;
            }
            else {
                let gradient = this.context.createLinearGradient(this.x, this.y, this.x + 50, this.y + 50);
                gradient.addColorStop(0, this.initialStyle);
                gradient.addColorStop(1, tileStates.get(this.nextState).fillStyle);
                this.fillStyle = gradient;
            }
        }
    }

    onDown() {
        if(idleWorkers > 0) {
            let resourceCount = Number.parseInt(window.localStorage.getItem(this.resource), 10);
            if (resourceCount && (resourceCount + this.resourceChange) >= 0) {
                activeWorkers = activeWorkers + 1;
                idleWorkers = idleWorkers - 1;
                this.toUpdate = true;
            }
            else if (!resourceCount) {
                activeWorkers = activeWorkers + 1;
                idleWorkers = idleWorkers - 1;
                this.toUpdate = true;
            }
            else alert('insufficient resources');
        }
        else alert('no available workers');
    }
}

let tiles = [];
let messages = [];
let totalWorkers = 4;
let activeWorkers = 0;
let idleWorkers = 4;

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
        const messages = document.getElementsByClassName('transitionMessage');
        for (const message of messages) {
            message.remove();
        }
        for (const tile of tiles) {
            tile.update();
            if (tile.transitionMessage) {
                let status = document.createElement('li');
                status.className = 'transitionMessage';
                status.textContent = tile.transitionMessage;
                statuses.appendChild(status);
            }
        }
    },
    render: function () {
        document.getElementById('lumber').innerHTML = localStorage.getItem('lumber');
        document.getElementById('idle').innerHTML = idleWorkers;

        for (const tile of tiles) tile.render();
    }
});

loop.start();