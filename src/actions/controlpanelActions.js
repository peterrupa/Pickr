import * as types from '../constants/ActionTypes';

export function setVolunteers(students) {
    return {
        type: types.FETCH_AVAILABLE_VOLUNTEERS,
        students
    };
}

export function modifyTags(tags) {
    return {
        type: types.MODIFY_TAGS,
        tags
    };
}

export function modifyStudents(students) {
    return {
        type: types.MODIFY_STUDENTS,
        students
    };
}

export function fetchAvailableVolunteers(classcode) {
    return (dispatch) => {
        fetch('/api/class/' + classcode + '/student', {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((students) => {
            dispatch(setVolunteers(students));
        });
    };
}