import {GET_CLASS, GET_STUDENTS, GET_ACTIVITIES} from '../constants/ActionTypes';

const initialState = {
    classViewed: null,
    activities: [],
    students: []
};

export default function classroomAppState(state = initialState, action) {
    switch (action.type) {
        case GET_CLASS:
            return Object.assign({}, state, {
                classViewed: action.classViewed
            });
        case GET_STUDENTS:
            return Object.assign({}, state, {
                students: action.students
            });
        case GET_ACTIVITIES:
            return Object.assign({}, state, {
                activities: action.activities
            });
        default:
            return state;
    }
}
