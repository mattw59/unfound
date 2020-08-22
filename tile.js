import { Sprite } from 'kontra';
import { Transition } from './transition';
export class BlockTile extends Sprite.class {

    constructor(properties) {
        super(properties);
        this.strokeStyle = '1px black';
        this.state = properties.state;
        this.nextTransition = properties.nextTransition;
        this.currentTransition = null;
        this.fillStyle = properties.fillStyle;
        this.nextState = properties.nextState;
    }

    render() {
        this.context.fillStyle = this.fillStyle;
        this.context.strokeStyle = this.strokeStyle;
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fill();
        this.context.stroke();
    }

    update() {
        console.log(this.currentTransition);
        
        if(this.currentTransition) {
            let now = new Date();
            let elapsed = now.getTime() - this.currentTransition.start.getTime();
            console.log(elapsed);
            if(elapsed >= this.currentTransition.runTimeMs) {
                this.fillStyle = this.currentTransition.nextState.fillStyle;
                this.currentTransition = null;
            }
        }
    }

    onDown() {
        console.log(`clicked the square at ${this.x}, ${this.y}`);
        this.currentTransition = this.nextTransition;
        this.currentTransition.start = new Date();
    }
}