import { Sprite } from 'kontra';
import { tileStates } from './tile-states';
export class BlockTile extends Sprite.class {

    takeState(state) {
        let stateToTake = tileStates.get(state);

        console.log(stateToTake);

        this.fillStyle = stateToTake.fillStyle,
        this.resource = stateToTake.resource,
        this.ticksToRun = stateToTake.ticksToRun;
        this.resourceChange = stateToTake.resourceChange;
        this.nextState = stateToTake.nextState;
        this.initialStyle = stateToTake.fillStyle;
    }

    constructor(properties) {
        super(properties);
        this.strokeStyle = '1px black';
        this.state = properties.state;
        this.toUpdate = false;
        this.transitionMessage = properties.transitionMessage;
        this.takeState(this.state);
    }

    render() {
        this.context.beginPath();
        this.context.fillStyle = this.fillStyle;
        this.context.strokeStyle = this.strokeStyle;
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fill();
        this.context.stroke();
    }

    update() {
        if (this.toUpdate) {
            this.ticksToRun = this.ticksToRun - 1;
            this.transitionMessage = `square at ${this.x},${this.y} is processing for ${this.ticksToRun} more s`;
            if (this.ticksToRun === 0) {
                let resourceCount = Number.parseInt(window.localStorage.getItem(this.resource), 10);
                resourceCount = resourceCount + this.resourceChange;
                window.localStorage.setItem(this.resource, `${resourceCount}`);
                this.takeState(this.nextState);
                this.toUpdate = false;
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
        let resourceCount = Number.parseInt(window.localStorage.getItem(this.resource), 10);
        if((resourceCount + this.resourceChange) >= 0) {
            this.toUpdate = true;   
        }
        else alert('insufficient resources');
    }
}