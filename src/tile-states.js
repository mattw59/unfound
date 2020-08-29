import { transitions } from './transitions';

export let tileStates = new Map();

tileStates.set('lightlyWooded', {
    fillStyle: '#3A8C63',
    resource: 'lumber',
    nextTransition: transitions.get('toCleared')
});
tileStates.set('cleared', {
    fillStyle: '#1CF689',
    resource: 'lumber',
    nextTransition: transitions.get('toCabin')
});
tileStates.set('cabin', {
    fillStyle: 'brown'
});