import { Sprite } from 'kontra';
import { Transition } from './transition';
import { tileStates } from './tile-states';
export class BlockTile extends Sprite.class {

    constructor(properties) {
        super(properties);
        this.strokeStyle = '1px black';
        this.state = properties.state;
        this.nextTransition = properties.nextTransition;
        this.currentTransition = null;
        this.fillStyle = properties.fillStyle;
        this.initialStyle = properties.fillStyle;
        this.toUpdate = false;
        this.resource = properties.resource;
        this.transitionMessage = null;
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
            let now = new Date();
            let elapsed = now.getTime() - this.currentTransition.start.getTime();
            this.transitionMessage = `square at ${this.x},${this.y} is processing for ${this.currentTransition.runTimeMs - elapsed} more ms`;
            let nextStyle = tileStates.get(this.currentTransition.nextState).fillStyle;
            if (elapsed >= this.currentTransition.runTimeMs) {
                this.fillStyle = nextStyle;
                this.toRender = true;
                this.toUpdate = false;
                this.transitionMessage = null;
                this.nextTransition = tileStates.get(this.currentTransition.nextState).nextTransition;
                
                let resourceCount = Number.parseInt(window.localStorage.getItem(this.resource), 10);
                resourceCount = resourceCount + this.currentTransition.resourcesGathered;
                window.localStorage.setItem(this.resource, `${resourceCount}`);
                
                this.currentTransition = null;
            }
            else {
                let gradient = this.context.createLinearGradient(this.x, this.y, this.x + 50, this.y + 50);
                gradient.addColorStop(0, this.initialStyle);
                gradient.addColorStop(1, nextStyle);
                this.fillStyle = gradient;
            }
        }
    }

    onDown() {
        this.currentTransition = this.nextTransition;
        this.currentTransition.start = new Date();
        this.toUpdate = true;
    }
}