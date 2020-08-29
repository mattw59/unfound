import { Transition } from './transition';

export let transitions = new Map();

transitions.set('toCleared', new Transition({
    runTimeMs: 3000,
    resourceChange: 3,
    nextState: 'cleared'
}));

transitions.set('toCabin', new Transition({
    runTimeMs: 4500,
    resourceChange: -5,
    nextState: 'cabin'
}))