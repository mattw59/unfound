import { Sprite } from 'kontra';
export class BlockTile extends Sprite.class {

    constructor(properties) {
        super(properties);
        this.strokeStyle = '1px black';    
    }

    render() {
        this.context.fillStyle = '#6699ff';
        this.context.strokeStyle = this.strokeStyle;
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fill();
        this.context.stroke();
    }

    onDown() {
        console.log(`clicked the square at ${this.x}, ${this.y}`);
    }
}