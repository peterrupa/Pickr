import { SET_STUDENT } from '../constants/ActionTypes';

const initialState = {
    student: ''
};

export default function studentAppState(state = initialState, action) {
    switch (action.type) {
        case SET_STUDENT:
            return Object.assign({}, state, {
                student: action.student
            });
        default:
            return state;
    }
}
