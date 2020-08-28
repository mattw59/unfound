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
        this.toUpdate = false;
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
            if (elapsed >= this.currentTransition.runTimeMs) {
                this.fillStyle = tileStates.get(this.currentTransition.nextState).fillStyle;
                this.currentTransition = null;
                this.toRender = true;
                this.toUpdate = false;
                this.transitionMessage = null;
            }
            else {
                let gradient = this.context.createLinearGradient(this.x, this.y, this.x + 50, this.y + 50);
                gradient.addColorStop(0, '#3A8C63');
                gradient.addColorStop(1, '#1CF689');
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