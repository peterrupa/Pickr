import * as types from '../constants/ActionTypes';

export function setVolunteers(students) {
    return {
        type: types.FETCH_AVAILABLE_VOLUNTEERS,
        students
    };
}

export function setActivity(activity) {
    return {
        type:  types.SET_ACTIVITY,
        activity
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

export function fetchActivity(activityId) {
    return (dispatch) =>{
        fetch('/api/class/activity/'+activityId, {
            method: 'GET'
        }).then((res) => {
            return res.json();        
        }).then((activity) => {
            dispatch(setActivity(activity));
        }).catch((err) => {
            throw err;
        });
    };
}

export function addNote(note) {
    return (dispatch) => {
        return fetch('/api/activity/'+note.activityId+'/note', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then((res) =>  res.json())
        .then((note) => dispatch((fetchActivity(note.ActivityId))))
        .catch((err) => {
            throw err;
        });
    };
}
