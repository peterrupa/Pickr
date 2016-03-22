import * as types from '../constants/ActionTypes';

export function setSamples(samples) {
    return {
        type: types.PRESENTATION_SAMPLES,
        samples
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
        }).then((samples) => {
            // dispatch action with data from server
            dispatch(setSamples(samples));
        });
    };
}
