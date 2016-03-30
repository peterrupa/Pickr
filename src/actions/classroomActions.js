export function addActivity(activity) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/activity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        })
        .then((res) =>  res.json())
        .then((activity) => activity)
        .catch((err) => {
            throw err;
        });
    };
}