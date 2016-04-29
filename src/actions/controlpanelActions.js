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

export function addTimer(studentId) {
    return {
        type: types.ADD_TIMER,
        studentId
    };
}

export function incrementTimers() {
    return {
        type: types.INCREMENT_TIMERS
    };
}

export function removeTimer(studentId) {
    return {
        type: types.REMOVE_TIMER,
        studentId
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