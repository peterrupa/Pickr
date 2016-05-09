export function create(account) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/account/createAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        })
        .then((res) =>  res.json())
        .then((account) => account)
        .catch((err) => {
            throw err;
        });
    };
}

export function sendMail(email) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/account/forgotPassword', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        .then((res) =>  res.json())
        .then((email) => email)
        .catch((err) => {
            throw err;
        });
    };
}

export function reset(token) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/account/resetPassword', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        })
        .then((res) =>  res.json())
        .then((token) => token)
        .catch((err) => {
            throw err;
        });
    };
}

export function change(account) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/account/changePassword', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        })
        .then((res) =>  res.json())
        .then((account) => account)
        .catch((err) => {
            throw err;
        });
    };
}
