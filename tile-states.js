import { transitions } from './transitions';

export let tileStates = new Map();

tileStates.set('lightlyWooded', {
    fillStyle: '#3A8C63',
    nextTransition: transitions.get('toCleared')
});
tileStates.set('cleared', {
    fillStyle: '#1CF689'
})