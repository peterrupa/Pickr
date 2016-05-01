import * as types from '../constants/ActionTypes';

export function setStudent(student) {
    return {
        type: types.SET_STUDENT,
        student
    };
}

export function fetchStudent(studentId) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/class/student/'+studentId, {
            method: 'GET'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((student) => {
            // dispatch action with data from server
            dispatch(setStudent(student));
        });
    };
}

export function editStudent(student) {
    return (dispatch) => {
        return fetch('/api/class/student/'+student.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then((res) =>  res.json())
        .then((student) => dispatch(fetchStudent(student.id)))
        .catch((err) => {
            throw err;
        });
    };
}

export function deleteStudent(student) {
    return (dispatch) => {
        return fetch('/api/class/student/'+student.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then((res) =>  res.json())
        .then((student) => dispatch(fetchStudent(student.id)))
        .catch((err) => {
            throw err;
        });
    };
}
