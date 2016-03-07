import * as types from '../constants/ActionTypes';

export function sampleIncrease(n) {
    return {
        type: types.SAMPLE_INCREASE,
        amount: n
    };
}

export function sampleDecrease(n) {
    return {
        type: types.SAMPLE_DECREASE,
        amount: n
    };
}

export function setSamples(samples) {
    return {
        type: types.FETCH_SAMPLES,
        samples
    };
}

export function fetchInitialSample() {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/sample', {
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