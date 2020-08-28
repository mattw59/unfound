import { Transition } from './transition';

export let transitions = new Map();

transitions.set('toCleared', new Transition({
    runTimeMs: 30000,
    resourcesGathered: 3,
    nextState: 'cleared'
}));