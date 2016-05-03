import * as types from '../constants/ActionTypes';

export function setAccountId(accountId) {
    return {
        type: types.GET_SESSION,
        accountId
    };
}

export function getAccountId() {
    return (dispatch) => {
        fetch('/api/account/whoami', {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((session) => {
            dispatch(setAccountId(session.accountId));
        });
    };
}
