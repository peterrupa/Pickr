import * as types from '../constants/ActionTypes';

export function setVolunteers(students) {
    return {
        type: types.FETCH_AVAILABLE_VOLUNTEERS,
        students
    };
}

export function setPreviousVolunteers(volunteers) {
    return {
        type: types.FETCH_PREVIOUS_VOLUNTEERS,
        volunteers
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

export function updatePreviousVolunteers(volunteer) {
    return {
        type: types.UPDATE_PREVIOUS_VOLUNTEERS,
        volunteer
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

export function modifyStudents(students) {
    return {
        type: types.MODIFY_STUDENTS,
        students
    };
}

export function fetchAvailableVolunteers(classcode) {
    return (dispatch) => {
        fetch('/api/student/fetchAll', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((volunteers) => {
            dispatch(setVolunteers(volunteers));
        })
        .catch((err) => {
            throw err;
        });
    };
}

export function insertRandomizedVolunteer(student) {
    return (dispatch) => {
        fetch('/api/volunteer/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                StudentId: student.id,
                ClassId: student.ClassId
            })
        })
        .then((res) =>  res.json())
        .then((volunteer) => {
            dispatch(updatePreviousVolunteers(volunteer));
        })
        .catch((err) =>{
            throw err;
        });
    };
}

export function fetchPreviousVolunteers() {
    return (dispatch) => {
        fetch('/api/volunteer/previous/all', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((volunteers) => {
            dispatch(setPreviousVolunteers(volunteers));
        })
        .catch((err) => {
            throw err;
        });
    };
}