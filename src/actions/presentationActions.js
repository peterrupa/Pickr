import * as types from '../constants/ActionTypes';

export function recieveRandomizedVolunteers(volunteers) {
    return {
        type: types.RECIEVE_RANDOMIZED_VOLUNTEERS,
        volunteers
    };
}

export function fetchRandomizedVolunteers(volunteers) {
    return (dispatch) => {
        dispatch(recieveRandomizedVolunteers(volunteers));
    };
}

export function setListOfStudents(students) {
    return {
        type: types.SET_LIST_OF_STUDENTS,
        students
    };
}

export function success() {
    return {
        type: types.SUCCESS
    };
}

export function fetchListOfStudents() {
    return ((dispatch) => {
        fetch('/api/student/fetchAll', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            return res.json();
        }).then((students) => {
            dispatch(setListOfStudents(students));
        });
    });
}