
export function setSamples(samples) {
    return {
        samples
    };
}

export function addStudent2(data) {
    return (dispatch) => {
         //ajax request to /api/sample
        fetch('/api/class/2/student', {
            method: 'GET',
            req: data
        }).then((res) => {
            // convert response to json
            //console.log(res);
            return res.json();
        });
    };
}
