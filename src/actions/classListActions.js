import * as types from '../constants/ActionTypes';

export function setClasses(classes) {
    return {
        type: types.FETCH_CLASSES,
        classes
    };
}

export function setUsername(username) {
    return {
        type: types.GET_USERNAME,
        username
    };
}

export function addClass(data) {
    return (dispatch) => {
        // ajax request to /api/sample
        if(!data.classCode) {
            return Promise.reject("Invalid data.");
        }
        
        return fetch('/api/account/class/addClass', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) =>  res.json())
        .then((classData) => dispatch(fetchClasses()))
        .catch((err) => {
            throw err;
        });
    };
}

export function deleteClass(data) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/account/class/'+data.id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) =>  res.json())
        .then((classData) => dispatch(fetchClasses()))
        .catch((err) => {
            throw err;
        });
    };
}

export function editClass(data) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/account/class/'+data.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) =>  res.json())
        .then((classData) => dispatch(fetchClasses()))
        .catch((err) => {
            throw err;
        });
    };
}

export function fetchClasses() {
    return (dispatch) => {
        fetch('/api/account/class/fetchAll', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((classes) => {
            // dispatch action with data from server
            dispatch(setClasses(classes));
        });
    };
}

export function getUsername() {
    return (dispatch) => {
        fetch('/api/account/getUsername', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            // convert response to json
            return res.json();
        }).then((username) => {
            // dispatch action with data from server
            dispatch(setUsername(username.username));
        });
    };
}
