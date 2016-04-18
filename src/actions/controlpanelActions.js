import * as types from '../constants/ActionTypes';

export function setVolunteers(students) {
    return {
        type: types.FETCH_AVAILABLE_VOLUNTEERS,
        students
    };
}

export function fetchAvailableVolunteers(classcode) {
    return (dispatch) => {
        fetch('/api/volunteer/available/' + classcode, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((students) => {
            dispatch(setVolunteers(students));
        });
    };
}
