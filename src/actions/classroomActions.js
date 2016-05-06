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

export function addActivity(activity) {
    return (dispatch) => {
        // ajax request to /api/sample
        return fetch('/api/class/'+activity.path+'/activity', {
            method: 'POST',
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
        let formData  = new FormData();

        for(name in student) {
            formData.append(name, student[name]);
        }
        
        // ajax request to /api/sample
        return fetch('/api/class/'+student.path+'/student', {
            method: 'POST',
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
        // ajax request to /api/sample
        return fetch('/api/class/student/'+student.id, {
            method: 'DELETE',
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
        // ajax request to /api/sample
        return fetch('/api/class/activity/'+activity.id, {
            method: 'DELETE',
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
      // ajax request to /api/sample
        return fetch('/api/account/class/'+data.id, {
            method: 'GET'
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
      // ajax request to /api/sample
        return fetch('/api/class/'+data.id+'/activity', {
            method: 'GET'
        })
       .then((res) =>  res.json())
       .then((activities) => {
           dispatch(setActivities(activities));
       });
    };
}

export function fetchStudents(data){
    return (dispatch) => {
      // ajax request to /api/sample
        return fetch('/api/class/'+data.id+'/student', {
            method: 'GET'
        })
       .then((res) =>  res.json())
       .then((students) => {
           dispatch(setStudents(students));
       });
    };
}
