// a reducer takes an input state and an action, does some process, and returns the transformed state

// import your action type constants
import {FETCH_AVAILABLE_VOLUNTEERS, GET_VOLUNTEER} from '../constants/ActionTypes';

// set your initial state here
const initialState = {
    availableVolunteers: [],
    volunteer: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function availableStudentsState(state = initialState, action) {
    switch (action.type) {
        case FETCH_AVAILABLE_VOLUNTEERS:
            return Object.assign({}, state, {
                availableVolunteers: action.students
            });
        default:
            return state;
    }
}

/*export default function selectedStudentsState(state = initialState, action) {
    switch(action.type) {
        case GET_VOLUNTEER:
            return Object.assign({}, state, {
                availableVolunteers: state.availableVolunteers,
                volunteer: action.volunteer
            });
        default:
            return state;
    }
}*/