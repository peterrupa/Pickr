// a reducer takes an input state and an action, does some process, and returns the transformed state

// import your action type constants
import {SAMPLE_INCREASE, SAMPLE_DECREASE, FETCH_SAMPLES} from '../constants/ActionTypes';

// set your initial state here
const initialState = {
    sampleCounter: 1,
    samples: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function sampleCounterAppState(state = initialState, action) {
    switch (action.type) {
        case SAMPLE_INCREASE:
            return Object.assign({}, state, {
                sampleCounter: state.sampleCounter + action.amount
            });

        case SAMPLE_DECREASE:
            return Object.assign({}, state, {
                sampleCounter: state.sampleCounter > 0 ? state.sampleCounter - action.amount : state.sampleCounter
            });

        case FETCH_SAMPLES:
            return Object.assign({}, state, {
                samples: action.samples
            });

        default:
            return state;
    }
}
