import { SET_STUDENT, SET_ATTEMPTS, SET_VOLUNTEER_ACTIVITIES} from '../constants/ActionTypes';

const initialState = {
    student: '',
    attempts: [],
    activities: []
};

export default function studentAppState(state = initialState, action) {
    switch (action.type) {
        case SET_STUDENT:
            return Object.assign({}, state, {
                student: action.student
            });
        case SET_ATTEMPTS:
            return Object.assign({}, state, {
                attempts: action.attempts
            });
        case SET_VOLUNTEER_ACTIVITIES:
            return Object.assign({}, state, {
                activities: action.activities
            });
        default:
            return state;
    }
}
