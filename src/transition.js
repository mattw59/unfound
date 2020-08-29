export class Transition {
    constructor(properties) {
        this.runTimeMs = properties.runTimeMs;
        this.start = properties.start;
        this.resourceChange = properties.resourceChange;
        this.nextState = properties.nextState;
    }
}