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
    nextState: ['cabin','farm','barn'],
    state: 'cleared'
});
tileStates.set('cabin', {
    fillStyle: 'brown',
    state: 'cabin'
});
tileStates.set('farm', {
    resource: 'food',
    ticksToRun: 30,
    resourceChange: 0,
    nextState: 'harvest',
    transitionAction: 'farming',
    state: 'farm' 
});
tileStates.set('harvest', {
    state: 'harvest',
    resource: 'food',
    ticksToRun: 3,
    resourceChange: 150,
    nextState: 'farm',
    transitionAction: 'harvesting food'
});
tileStates.set('barn', {
    fillStyle: 'brown',
    state: 'barn'
});
tileStates.set('water', {
    fillStyle: '#00BFFF',
    state: 'water',
});