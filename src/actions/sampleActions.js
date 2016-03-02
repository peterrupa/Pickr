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