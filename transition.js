export class Transition {
    constructor(properties) {
        this.runTimeMs = properties.runTimeMs;
        this.start = properties.start;
        this.resourcesGathered = properties.resourcesGathered;
        this.nextState = properties.nextState;
    }
}