import { FETCH_CLASSES } from '../constants/ActionTypes';

const initialState = {
    classes: []
};

export default function classroomAppState(state = initialState, action) {
    switch (action.type) {
        case FETCH_CLASSES:
            return Object.assign({}, state, {
                classes: action.classes
            });    	
        default:
            return state;
    }
}
