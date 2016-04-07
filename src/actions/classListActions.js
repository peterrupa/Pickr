import * as types from '../constants/ActionTypes';

export function setClasses(classes) {
    return {
        type: types.FETCH_CLASSES,
        classes
    };
}

export function fetchInitialClasses() {
    return (dispatch) => {
        fetch('/api/class?AccountId=25', {
            method: 'GET'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((classes) => {
            // dispatch action with data from server
            dispatch(setClasses(classes));
        });
    };
}