import { combineReducers } from 'redux';
import sampleAppState from './sample';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    routing: routeReducer
});

export default rootReducer;
