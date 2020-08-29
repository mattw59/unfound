export let tileStates = new Map();

tileStates.set('lightlyWooded', {
    fillStyle: '#3A8C63',
    resource: 'lumber',
    ticksToRun: 10,
    resourceChange: 3,
    nextState: 'cleared'
});
tileStates.set('cleared', {
    fillStyle: '#1CF689',
    resource: 'lumber',
    ticksToRun: 10,
    resourceChange: -5,
    nextState: 'cabin'
});
tileStates.set('cabin', {
    fillStyle: 'brown'
});