export let tileStates = new Map();

tileStates.set('lw', {
    fillStyle: '#3A8C63',
    resource: 'lumber',
    ticksToRun: 10,
    resourceChange: 3,
    nextState: 'cleared',
    transitionAction: 'clearing wood',
    state: 'lw'
});
tileStates.set('cleared', {
    fillStyle: '#1CF689',
    resource: 'lumber',
    ticksToRun: [10, 20],
    resourceChange: [-5, -10],
    nextState: ['cabin','farm'],
    state: 'cleared'
});
tileStates.set('cabin', {
    fillStyle: 'brown',
    state: 'cabin'
});
tileStates.set('farm', {
    fillStyle: 'yellow',
    state: 'farm'
});