import _ from 'lodash';

// import your action type constants
import { FETCH_AVAILABLE_VOLUNTEERS, MODIFY_TAGS, ADD_TIMER, INCREMENT_TIMERS, REMOVE_TIMER, MODIFY_STUDENTS, FETCH_PREVIOUS_VOLUNTEERS, UPDATE_PREVIOUS_VOLUNTEERS, MODIFY_N_VOLUNTEERS, MODIFY_MAX_REPEATS } from '../constants/ActionTypes';

// set your initial state here
const initialState = {
    filters: {
        nVolunteers: 1,
        maxRepeats: 1
    },
    availableVolunteers: [],
    volunteer: [],
    tags: [],
    timer: [],
    students: [],
    previousVolunteers: []
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

        case ADD_TIMER: {
            let newTimer = state.timer;

            newTimer.push({
                studentId: action.studentId,
                timer: 0
            });

            return Object.assign({}, state, {
                timer: newTimer
            });
        }

        case REMOVE_TIMER: {
            let newTimer = state.timer;

            newTimer = _.filter(newTimer, (o) => {
                return o.studentId !== action.studentId;
            });

            return Object.assign({}, state, {
                timer: newTimer
            });
        }

        case INCREMENT_TIMERS: {
            return Object.assign({}, state, {
                timer: state.timer.map((timer) => {
                    timer.timer++;

                    return timer;
                })
            });
        }

        case MODIFY_STUDENTS:
            return Object.assign({}, state, {
                students: action.students
            });
            
        case FETCH_PREVIOUS_VOLUNTEERS:
            return Object.assign({}, state, {
                previousVolunteers: action.volunteers
            });
            
        case UPDATE_PREVIOUS_VOLUNTEERS: {
            let previousVolunteers = state.previousVolunteers;
            previousVolunteers.push(action.volunteer);
            
            return Object.assign({}, state, {
                previousVolunteers: previousVolunteers
            });
        }
        
        case MODIFY_N_VOLUNTEERS: {
            let value = parseInt(action.value.replace(/[^0-9]/g, '')),
                filters = state.filters;
                
            filters.nVolunteers = action.value;

            return Object.assign({}, state, {
                filters: filters
            });
        }
        
        case MODIFY_MAX_REPEATS: {
            let value = parseInt(action.value.replace(/[^0-9]/g, '')),
                filters = state.filters;
                
            filters.maxRepeats = action.value;
            
            return Object.assign({}, state, {
                filters: filters
            });
        }

        default:
            return state;
    }
}
