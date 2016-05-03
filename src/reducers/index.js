import { combineReducers } from 'redux';
import sampleAppState from './sample';
import sessionAppState from './session';
import classroomAppState from './classroom';
import classListAppState from './classList';
import presentationState from './presentation';
import controlPanelState from './controlpanel';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    sampleAppState,
    sessionAppState,
    classroomAppState,
    classListAppState,
    presentationState,
    controlPanelState,
    routing: routeReducer
});

export default rootReducer;
