import { FETCH_CLASSES, GET_USERNAME } from '../constants/ActionTypes';

const initialState = {
    username: '',
    classes: []
};

export default function classroomAppState(state = initialState, action) {
    switch (action.type) {
        case FETCH_CLASSES:
            return Object.assign({}, state, {
                classes: action.classes
            });

        case GET_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            });

        default:
            return state;
    }
}
