import { combineReducers } from 'redux';
import sampleAppState from './sample';
import presentationState from './presentation';
import availableStudentsState from './controlpanel';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    presentationState,
    availableStudentsState,
    routing: routeReducer
});

export default rootReducer;
