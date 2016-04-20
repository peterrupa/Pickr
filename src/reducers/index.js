import { combineReducers } from 'redux';
import sampleAppState from './sample';
import classroomAppState from './classroom';
import classListAppState from './classList';
import studentAppState from './student';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    classroomAppState,
    classListAppState,
    studentAppState,
    routing: routeReducer
});

export default rootReducer;
