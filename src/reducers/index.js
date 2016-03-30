import { combineReducers } from 'redux';
import sampleAppState from './sample';
import classroomAppState from './classroom';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    classroomAppState,
    routing: routeReducer
});

export default rootReducer;
