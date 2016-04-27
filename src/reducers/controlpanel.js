// a reducer takes an input state and an action, does some process, and returns the transformed state

// import your action type constants
import {FETCH_AVAILABLE_VOLUNTEERS, MODIFY_TAGS } from '../constants/ActionTypes';

// set your initial state here
const initialState = {
    availableVolunteers: [],
    volunteer: [],
    tags: [],
    timer: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function controlPanelState(state = initialState, action) {
    switch (action.type) {
        case FETCH_AVAILABLE_VOLUNTEERS:
            return Object.assign({}, state, {
                availableVolunteers: action.students
            });

        case MODIFY_TAGS:
            return Object.assign({}, state, {
                tags: action.tags
            });

        default:
            return state;
    }
}