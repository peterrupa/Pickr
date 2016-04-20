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
