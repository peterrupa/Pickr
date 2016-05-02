import * as types from '../constants/ActionTypes';

export function addNote(note) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/activity/'+note.path+'/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then((res) =>  res.json())
        .then((note) => dispatch(note))
        .catch((err) => {
            throw err;
        });
    };
}

