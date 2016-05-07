import {GET_CLASS, GET_STUDENTS, GET_ACTIVITIES, GET_VOLUNTEERS} from '../constants/ActionTypes';

const initialState = {
    classViewed: '',
    activities: [],
    students: [],
    volunteers: []
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
        case GET_VOLUNTEERS:
            return Object.assign({}, state, {
                volunteers: action.volunteers
            });
        default:
            return state;
    }
}
