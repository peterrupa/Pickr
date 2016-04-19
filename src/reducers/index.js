import { combineReducers } from 'redux';
import sampleAppState from './sample';
import classroomAppState from './classroom';
import classListAppState from './classList';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    classroomAppState,
    classListAppState,
    routing: routeReducer
});

export default rootReducer;
