// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import HighCharts from 'highcharts';
import Tag from '../components/Tag.jsx';

import { addActivity, addStudent, fetchClass, fetchStudents, fetchActivities, setCID, fetchVolunteers } from '../actions/classroomActions';
import '../styles/oneUI.css';
import StudentEditModal from '../components/StudentEditModal.jsx';
import StudentDeleteModal from '../components/StudentDeleteModal.jsx';
import ActivityItem from '../components/ActivityItem.jsx';


const Materialize = window.Materialize;

// Be sure to rename your class name
class ClassRoom extends React.Component {
    componentWillMount() {
        let path = window.location.pathname;
        let data = {
            id: path.substring(11)
        };
        this.props.setCID(data);
        this.props.fetchClass(data);
        this.props.fetchStudents(data);
        this.props.fetchActivities(data);
        this.props.fetchVolunteers(data);
    }

    componentDidMount() {
        $('.modal-trigger').leanModal();
    }

    addActivity(e) {
        e.preventDefault();

        // @TODO: validation
        let activity = {
            path: window.location.pathname.substring(11),
            activityName: $('#activityName').val(),
            activityDesc: $('#activityDesc').val()
        };

        this.props.addActivity(activity).then((res) => {
            Materialize.toast('Successfully added activity.', 4000, 'toast-success');
        }).catch((err) => {
            Materialize.toast('Error adding activity.', 4000, 'toast-error');
        });
    }

    addStudent(e) {
        e.preventDefault();
        // parse tags
        let tags = $('#tags').val().split(', ');

        // @TODO: validation
        let student = {
            path: window.location.pathname.substring(11),
            fname: $('#firstName').val(),
            lname: $('#lastName').val(),
            mname: $('#middleName').val(),
            image: $('#image')[0].files[0],
            tags
        };

        this.props.addStudent(student).then((res) => {
            Materialize.toast('Successfully added student.', 4000, 'toast-success');
            $('#add-student-form')[0].reset();
            $('#addStudent').scrollTop(0);
        }).catch((err) => {
            Materialize.toast('Error adding student.', 4000, 'toast-error');
            $('#add-student-form')[0].reset();
            $('#addStudent').scrollTop(0);
        });

    }

    handleClick(e) {
        e.preventDefault();

        let fileInput = document.getElementById('fileInput');
        let file = fileInput.files[0];
        let textType = /csv/;

        if (file.type.match(textType)) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let fileValue = reader.result.trim();
                let allTextLines = fileValue.split(/\r\n|\n/);
                while (allTextLines.length > 0) {
                    let entries = allTextLines.shift().split(',');
                    // @TODO: validation
                    let student = {
                        path: window.location.pathname.substring(11),
                        lname: entries.shift(),
                        fname: entries.shift(),
                        mname: entries.shift(),
                        tags: entries
                    };
                    this.props.addStudent(student).catch((err) => {
                        Materialize.toast('Error adding student.', 4000, 'toast-error');
                    });
                }
            };
            reader.readAsText(file);
        } else {
            alert("File not supported!");
        }
    }


    render() {
        let activityList = [];
        let studentList = [];
        let todayVolunteers = 0;
        let monthVolunteers = 0;
        let tagMapCount = [];
        let obj = {};
        let studentCount = {};
        let count = [];
        let student = this.props.classroomAppState.students;

        this.props.classroomAppState.volunteers.forEach(function(volunteer){
          //gets counter for all volunteers called in the todays date
            if(volunteer.createdAt.substring(0,10) == new Date().toJSON().substring(0,10)){ //compares string of year, month, date
                todayVolunteers++;
            }
            if(volunteer.createdAt.substring(0,7) == new Date().toJSON().substring(0,7)){ //compares string of year, month
                monthVolunteers++;
            }
            volunteer.tags.forEach(function(tag){
                tagMapCount.push(tag);
            });

            if(studentCount[volunteer.StudentId] == undefined || studentCount[volunteer.StudentId] == null) studentCount[volunteer.StudentId] = 1;
            else studentCount[volunteer.StudentId] += 1;
        });

        for (let i = 0, j = tagMapCount.length; i < j; i++) {
            obj[tagMapCount[i]] = (obj[tagMapCount[i]] || 0) + 1;
        }
        let keysSorted = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a];});


        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '5 Most Called Tags'
            },
            subtitle: {
                text: 'This table indicates most called tags'
            },
            theme: {},
            xAxis: {
                categories: (function() {
                    let labels = keysSorted.splice(0,5);
                    return labels;
                }()),
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of times used/called'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:f} times</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Tags',
                    data: (function() {
                        // generate an array of random data
                        let values = [];
                        let keysSorted = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a];});
                        values.push(obj[keysSorted[0]]);
                        values.push(obj[keysSorted[1]]);
                        values.push(obj[keysSorted[2]]);
                        values.push(obj[keysSorted[3]]);
                        values.push(obj[keysSorted[4]]);
                        return values;
                    }())
                }
            ]
        });

        $('#container2').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '5 Most Called Students'
            },
            subtitle: {
                text: 'This table indicates most called students'
            },
            theme: {},
            xAxis: {
                categories: (function() {
                    let labels = [];
                    let keysSorted = Object.keys(studentCount).sort(function(a,b){return studentCount[b]-studentCount[a];});
                    keysSorted.forEach(function(key){
                        for(let i = 0; i < student.length; i++){
                            if(student[i].id.toString() == key){
                                labels.push(student[i].lname+" "+student[i].fname);
                            }
                        }
                    });
                    return labels;
                }()),
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of times called'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:f} times</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Students',
                    data: (function() {
                        // generate an array of random data
                        let values = [];
                        let keysSorted = Object.keys(studentCount).sort(function(a,b){return studentCount[b]-studentCount[a];});
                        for(let i = 0; i < 5 ; i++){
                            values.push(studentCount[keysSorted[i]]);
                        }
                        return values;
                    }())
                }
            ]
        });

        this.props.classroomAppState.activities.forEach(function(activity) {
            activityList.push(
                <ActivityItem
                    activity={activity}
                />
            );
        });

        let sortedStudents = _.sortBy(this.props.classroomAppState.students, (o) => {
            return o.lname;
        });

        sortedStudents.forEach(function(student) {
            let image;

            if (!student.image) {
                image = '/img/defaultPP.png';
            } else {
                image = '/uploads/' + student.image;
            }

            studentList.push(
                <li key={student.id}>
                    <StudentEditModal student={student}/>
                    <StudentDeleteModal student={student}/>
                    <Link to={"/student/"+student.id}>
                        <img className="img-avatar" src={image} alt=""  style={{float: 'left', height: '45px', width: '45px', marginRight:'10px'}}/>
                        {student.fname + " " + student.mname + " " + student.lname}
                        <div className="font-w400 text-muted">
                            <small>
                                {student.tags.map((tag) => <Tag key={tag} name={tag}/>)}
                            </small>
                        </div>
                    </Link>
                    <br/>
                </li>
            );
        });

        return (
            <div className="wrapper">
                <div className="tint">
                    <div className="content bg-image overflow-hidden" style={{
                        backgroundImage: 'url(' + '/img/bg.jpg' + ')'
                    }}>
                        <div className="push-50-t push-20">
                            <h1 className="h2 text-white animated zoomIn">Welcome to {this.props.classroomAppState.classViewed.classCode}</h1>
                            <h2 className="h5 text-white-op animated zoomIn">{this.props.classroomAppState.classViewed.className}</h2>
                            <div>
                                <Link className="waves-effect waves-light btn-large grey darken-3" to="/class" style={{
                                    float: 'right',
                                    bottom: '50px'
                                }}>Return to Classes</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content bg-white border-b">
                    <div className="row items-push text-uppercase">
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">NUMBER OF STUDENTS</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    Today</small>
                            </div>
                            <p className="h2 font-w300 text-primary animated flipInX">{this.props.classroomAppState.students.length}</p>
                        </div>
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">TOTAL CALLED</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    Today</small>
                            </div>
                            <p className="h2 font-w300 text-primary animated flipInX">{todayVolunteers}</p>
                        </div>
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">TOTAL CALLED</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    This Month</small>
                            </div>
                            <p className="h2 font-w300 text-primary animated flipInX">{monthVolunteers}</p>
                        </div>
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">TOTAL CALLED</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    All Time</small>
                            </div>
                            <p className="h2 font-w300 text-primary animated flipInX">{this.props.classroomAppState.volunteers.length}</p>
                        </div>
                    </div>
                </div>

                <div style={{padding: '1em'}}>
                    <div className="row">
                        <div className="col s12 m12 l4">
                            <div className="block block-bordered">
                                <div className="block-header">
                                    <ul className="block-options">
                                        <li>
                                            <Link className="modal-trigger" to="#addstudent">
                                                <i className="material-icons right">add</i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="modal-trigger" to="#openFile">
                                                <i className="material-icons right">folder</i>
                                            </Link>

                                        </li>
                                    </ul>
                                    <h3 className="block-title">Students</h3>
                                </div>
                                <div className="block-content">
                                    <ul className="task-card">
                                        {studentList}
                                    </ul>
                                </div>
                                {/*block cntent*/}
                            </div>
                        </div>
                        {/* product-card */}
                        <div className="col s12 m12 l8" style={{marginBottom: '1em'}}>
                            <ul id="task-card" className="collection with-header no-margin">
                                <span id="act">
                                    <li className="collection-header cyan">
                                        <span>
                                            <h3 className="task-card-title">Activities</h3>
                                            <p className="task-card-date">March 26, 2015<Link className="btn-floating btn-tiny modal-trigger green right z-depth-0" to="#addactivity">
                                                    <i className="large material-icons">add</i>
                                                </Link>
                                            </p>
                                        </span>

                                    </li>
                                </span>
                                {activityList}
                            </ul>

                            {/* map-card */}
                        </div>
                        <div id="container" className="col s12 m12 l4" ></div>
                        <div id="container2" className="col s12 m12 l4" ></div>
                        <div id="addstudent" className="modal">
                            <form id="add-student-form" onSubmit={(e) => this.addStudent(e)}>
                                <div className="modal-content">
                                    <h3>Add Student</h3>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="firstName" required="required" type="text" className="validate"/>
                                            <label htmlFor="firstName">First Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="middleName" type="text" required="required" className="validate"/>
                                            <label htmlFor="middleName">Middle Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="lastName" type="text" required="required" className="validate"/>
                                            <label htmlFor="lastName">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="tags" type="text" required="required" className=""/>
                                                <label htmlFor="tags">Tags (separated by comma and space)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12">
                                            <span>Image (Optional)</span>
                                        </div>
                                        <div className="file-field input-field col s12">
                                            <div className="btn">
                                                <span>File</span>
                                                <input id="image" type="file"/>
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                                    <button to="#" className="waves-effect waves-green btn-flat modal-action modal-close" type="submit">Add Student</button>
                                </div>
                            </form>
                        </div>

                        <div id="openFile" className="modal">
                            <form onSubmit={(e) => this.handleClick(e)}>
                                <div className="modal-content">
                                    <h3>Import Students from file</h3>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="fileInput" type="file" className="validate"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                                    <button className="waves-effect waves-green btn-flat modal-action modal-close" type="submit">
                                        Import File
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div id="addactivity" className="modal">
                            <form onSubmit={(e) => this.addActivity(e)}>
                                <div className="modal-content">
                                    <h3>Add Activity</h3>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="activityName" type="text" className="validate"/>
                                            <label htmlFor="activityName">Activity</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="activityDesc" type="text" className="validate"/>
                                            <label htmlFor="activityDesc">Description</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                                    <button className="waves-effect waves-green btn-flat modal-action modal-close" type="submit">Add Activity</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <footer id="page-footer" className="content-mini content-mini-full font-s12 bg-gray-lighter clearfix">
                    <div className="pull-right">
                        Crafted with &nbsp;<i className="tiny material-icons">favorite</i>&nbsp; by&nbsp;
                        <Link className="font-w600" to="#" target="_blank">CMSC128 AB-3L</Link>
                    </div>
                    <div className="pull-left">
                        <Link className="font-w600" to="#" target="_blank">Pickr 1.0</Link>
                        &copy;
                        <span className="js-year-copy"></span>
                    </div>
                </footer>
            </div>

        );
    }
}

ClassRoom.propTypes = {
    classroomAppState: PropTypes.object.isRequired,
    addActivity: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    fetchClass: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    fetchActivities: PropTypes.func.isRequired,
    setCID: PropTypes.func.isRequired,
    fetchVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
state => ({ classroomAppState: state.classroomAppState}),
    { addActivity, addStudent, fetchClass, fetchStudents, fetchActivities, setCID, fetchVolunteers }
)(ClassRoom);
