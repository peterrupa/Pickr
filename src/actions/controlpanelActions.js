import * as types from '../constants/ActionTypes';

export function getVolunteer(volunteers, n) {
    let selectedVolunteers = [];
    selectedVolunteers.push(volunteers[Math.floor(Math.random() * volunteers.length)]);
    return {
        type: types.GET_VOLUNTEER,
        selectedVolunteers
    };
}

export function setVolunteers(students) {
    return {
        type: types.FETCH_AVAILABLE_VOLUNTEERS,
        students
    };
}

export function fetchAvailableVolunteers(classcode) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/volunteer/available/' + classcode, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((students) => {
            // dispatch action with data from server
            dispatch(setVolunteers(students));
        });
    };
}
