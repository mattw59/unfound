import { Transition } from './transition';

export let transitions = new Map();

transitions.set('toCleared', new Transition({
    runTimeMs: 3000,
    resourcesGathered: 3,
    nextState: 'cleared'
}));

transitions.set('toCabin', new Transition({
    runTimeMs: 4500,
    resourcesGathered: 0,
    nextState: 'cabin'
}))