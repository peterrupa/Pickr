import * as types from '../constants/ActionTypes';

export function setClasses(classes) {
    return {
        type: types.FETCH_CLASSES,
        classes
    };
}

export function fetchClass() {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/class', {
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

export function addNewClass(data) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/class', {
            method: 'POST',
            req: data
        }).then((res) => {
            // convert response to json
            if(res)
                fetchClass();
        }).then((classes) => {
            // dispatch action with data from server
            dispatch(setClasses(classes));
        });
    };
}
