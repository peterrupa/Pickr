import { combineReducers } from 'redux';
import sampleAppState from './sample';
import classAppState from './class';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    classAppState,
    routing: routeReducer
});

export default rootReducer;
