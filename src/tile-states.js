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
    ticksToRun: 10,
    resourceChange: -5, 
    nextState: ['cabin','farm'],
    state: 'cleared'
});
tileStates.set('cabin', {
    fillStyle: 'brown',
    state: 'cabin'
});
tileStates.set('farm', {
    fillStyle: 'yellow',
    resource: 'food',
    ticksToRun: 30,
    resourceChange: 0,
    nextState: 'harvest',
    transitionAction: 'farming',
    state: 'farm' 
});
tileStates.set('harvest', {
    fillStyle: 'orange',
    state: 'harvest',
    resource: 'food',
    ticksToRun: 3,
    resourceChange: 40,
    nextState: 'farm',
    transitionAction: 'harvesting food',
    state: 'harvest'
});