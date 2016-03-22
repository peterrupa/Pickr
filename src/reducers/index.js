import { combineReducers } from 'redux';
import sampleAppState from './sample';
import presentationState from './presentation';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    presentationState,
    routing: routeReducer
});

export default rootReducer;
