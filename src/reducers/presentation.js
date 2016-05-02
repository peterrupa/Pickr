// a reducer takes an input state and an action, does some process, and returns the transformed state

// import your action type constants
import {SET_VOLUNTEERS, RECIEVE_RANDOMIZED_VOLUNTEERS, SET_LIST_OF_STUDENTS, SUCCESS } from '../constants/ActionTypes';

// set your initial state here
const initialState = {
    recievedVolunteer: false,
    volunteers: [],
    students: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function presentationState(state = initialState, action) {
    switch (action.type) {
        case SET_VOLUNTEERS:
            return Object.assign({}, state, {
                volunteers: action.volunteers
            });

        case RECIEVE_RANDOMIZED_VOLUNTEERS:
            return Object.assign({}, state, {
                recievedVolunteer: true,
                volunteers: action.volunteers
            });

        case SET_LIST_OF_STUDENTS:
            return Object.assign({}, state, {
                students: action.students
            });

        case SUCCESS:
            return Object.assign({}, state, {
                recievedVolunteer: false
            });

        default:
            return state;
    }
}