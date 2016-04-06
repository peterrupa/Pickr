import * as types from '../constants/ActionTypes';

export function setVolunteers(volunteers) {
    return {
        type: types.SET_VOLUNTEERS,
        volunteers
    };
}

export function fetchInitialSample() {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/volunteer/1', {
            method: 'GET'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((volunteers) => {
            // dispatch action with data from server
            dispatch(setVolunteers(volunteers));
        });
    };
}
