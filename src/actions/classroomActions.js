import * as types from '../constants/ActionTypes';

export function setClassViewed(classData) {
    return {
        type: types.GET_CLASS,
        classViewed: classData
    };
}

export function setActivities(activities) {
    return {
        type: types.GET_ACTIVITIES,
        activities: activities
    };
}

export function setStudents(students) {
    return {
        type: types.GET_STUDENTS,
        students: students
    };
}

export function setVolunteers(volunteers) {
    return {
        type: types.GET_VOLUNTEERS,
        volunteers: volunteers
    };
}

export function addActivity(activity) {
    return (dispatch) => {
        return fetch('/api/class/'+activity.path+'/activity', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        })
        .then((res) =>  res.json())
        .then((activity) => dispatch(fetchActivities({id: activity.ClassId})))
        .catch((err) => {
            throw err;
        });
    };
}

export function addStudent(student) {
    return (dispatch) => {
        if(!student.fname || !student.mname || !student.lname || !student.tags) {
            return Promise.reject('Invalid input.');
        }
        
        let formData  = new FormData();

        for(name in student) {
            formData.append(name, student[name]);
        }
        
        return fetch('/api/class/'+student.path+'/student', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then((res) =>  res.json())
        .then((student) => dispatch(fetchStudents({id: student.ClassId})))
        .catch((err) => {
            throw err;
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
        .then((student) => dispatch(fetchStudents({id: student.ClassId})))
        .catch((err) => {
            throw err;
        });
    };
}

export function deleteStudent(student) {
    return (dispatch) => {
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
        .then((student) => dispatch(fetchStudents({id: student.ClassId})))
        .catch((err) => {
            throw err;
        });
    };
}

export function deleteActivity(activity) {
    return (dispatch) => {
        return fetch('/api/class/activity/'+activity.id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        })
        .then((res) =>  res.json())
        .then((activity) => dispatch(fetchActivities({id: activity.ClassId})))
        .catch((err) => {
            throw err;
        });
    };
}

export function fetchClass(data){
    return (dispatch) => {
        return fetch('/api/account/class/'+data.id, {
            method: 'GET',
            credentials: 'include'
        })
       .then((res) =>  res.json())
       .then((classData) => {
           dispatch(setClassViewed(classData));
       })
       .catch((err) =>{
           throw err;
       });
    };
}

export function fetchActivities(data){
    return (dispatch) => {
        return fetch('/api/class/'+data.id+'/activity', {
            method: 'GET',
            credentials: 'include'
        })
       .then((res) =>  res.json())
       .then((activities) => {
           dispatch(setActivities(activities));
       });
    };
}

export function fetchStudents(data){
    return (dispatch) => {
        return fetch('/api/class/'+data.id+'/student', {
            method: 'GET',
            credentials: 'include'
        })
       .then((res) =>  res.json())
       .then((students) => {
           dispatch(setStudents(students));
       });
    };
}

export function setCID(data){
    return (dispatch) => {
        return fetch('/api/account/class/setCID', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:parseInt(data.id)})
        })
        .then((res) =>  res.json())
        .catch((err) => {
            throw err;
        });
    };
}

export function fetchVolunteers(data){
    return (dispatch) => {
      // ajax request to /api/sample
        return fetch('/api/volunteer/class/'+data.id, {
            method: 'GET',
            credentials: 'include'
        })
       .then((res) =>  res.json())
       .then((volunteers) => {
           dispatch(setVolunteers(volunteers));
       });
    };
}
