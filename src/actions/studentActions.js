import * as types from '../constants/ActionTypes';

export function setStudent(student) {
    return {
        type: types.SET_STUDENT,
        student
    };
}


export function setAttempts(attempts) {
    return {
        type: types.SET_ATTEMPTS,
        attempts
    };
}

export function setVolunteerActivities(activities) {
    return {
        type: types.SET_VOLUNTEER_ACTIVITIES,
        activities
    };
}

export function fetchStudent(studentId) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/class/student/'+studentId, {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((student) => {
            // dispatch action with data from server
            dispatch(setStudent(student));
        });
    };
}

export function fetchStudentVolunteer(studentId) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/volunteer/'+studentId+'/info', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((attempts) => {
            // dispatch action with data from server
            //console.log(attempts);
            dispatch(setAttempts(attempts));
        });
    };
}

export function fetchVolunteerActivities(studentId) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/volunteer/'+studentId+'/activities', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((activities) => {
            // dispatch action with data from server
            //console.log(activities);
            dispatch(setVolunteerActivities(activities));
        });
    };
}

export function editStudent(student) {
    return (dispatch) => {
        let formData  = new FormData();

        for(name in student) {
            formData.append(name, student[name]);
        }

        return fetch('/api/class/student/'+student.id, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        .then((res) =>  res.json())
        .then((student) => dispatch(fetchStudent(student.id)))
        .catch((err) => {
            throw err;
        });
    };
}


export function deleteStudent(student) {
    return fetch('/api/class/student/'+student.id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then((res) =>  res.json())
    .catch((err) => {
        throw err;
    });
}
