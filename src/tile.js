import { Sprite, emit } from 'kontra';
import { tileStates } from './tile-states';
export class BlockTile extends Sprite.class {

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
            case 'lw':
                this.context.beginPath();
                this.context.fillStyle = 'brown';
                this.context.fillRect(this.x+22, this.y+26, 6, 24);

                this.context.beginPath();
                this.context.fillStyle = 'green';
                this.context.ellipse(this.x+25, this.y+20, 20, 13, 0,  0, 2*Math.PI);
                this.context.fill();
                break;
            case 'cleared':
                this.context.beginPath();
                this.context.strokeStyle = this.strokeStyle;
                this.context.fillStyle = 'white';
                this.context.rect(this.x, this.y, this.width, this.height);
                this.context.fill();
                break;
            case 'cabin':
                this.context.beginPath();
                this.context.strokeStyle = this.strokeStyle;
                this.context.fillStyle = 'brown'
                this.context.moveTo(this.x + this.width / 2, this.y + 1);
                this.context.lineTo(this.x + this.width - 1, this.y + 20);
                this.context.lineTo(this.x + 1, this.y + 20);
                this.context.closePath();
                this.context.stroke();
  
                this.context.beginPath();
                this.context.moveTo(this.x + 5, this.y + this.height);
                this.context.lineTo(this.x + 5, this.y + 20);
                this.context.stroke();

                this.context.beginPath();
                this.context.moveTo(this.x + this.width - 5, 20);
                this.context.lineTo(this.x +  + this.width - 5, this.height);
                this.context.stroke();

                this.context.beginPath();
                this.context.moveTo(this.x + 1, this.y + this.height);
                this.context.lineTo(this.x + this.width - 1, this.y + this.height);
                this.context.stroke();

                this.context.beginPath();
                this.context.moveTo(this.x + 20, this.y + 50);
                this.context.lineTo(this.x + 20, this.y + 30);
                this.context.lineTo(this.x + 30, this.y + 30);
                this.context.lineTo(this.x + 30, this.y + 50);
                this.context.fill();
                break;
            case 'farm':
                this.context.fillStyle = this.fillStyle;
                this.context.fillRect(this.x, this.y, this.width, this.height);
                break;
            default:
                break;
        }
    }

    update() {
        if (this.toUpdate) {
            this.ticksToRun = this.ticksToRun - 1;
            this.transitionMessage = `1 worker ${this.transitionAction} for ${this.ticksToRun} s`;
            if (this.ticksToRun === 0) {
                let resourceCount = Number.parseInt(window.localStorage.getItem(this.resource), 10);
                if (resourceCount)
                    resourceCount = resourceCount + this.resourceChange;
                else resourceCount = this.resourceChange;
                window.localStorage.setItem(this.resource, `${resourceCount}`);
                this.takeState(this.nextState);
                this.toUpdate = false;
                this.transitionMessage = null;
                emit('endTransition', this.x, this.y);
            }
        }
    }

    onDown() {
        if(this.nextState instanceof Array) {
            emit('askForChoice', this.x, this.y);
        }
        else {
            emit('transition', this.x, this.y);
        }
    }
}
