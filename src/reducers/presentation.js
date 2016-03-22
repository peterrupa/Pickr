// a reducer takes an input state and an action, does some process, and returns the transformed state

// import your action type constants
import {PRESENTATION_SAMPLES} from '../constants/ActionTypes';

// set your initial state here
const initialState = {
    volunter: ''
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function presentationState(state = initialState, action) {
    switch (action.type) {
        case PRESENTATION_SAMPLES:
            return Object.assign({}, state, {
                volunteer: action.samples
            });

        default:
            return state;
    }
}
