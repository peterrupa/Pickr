// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import io from 'socket.io-client';
import _ from 'lodash';

import { fetchAvailableVolunteers, fetchPreviousVolunteers, modifyTags, addTimer, incrementTimers, removeTimer, modifyStudents, insertRandomizedVolunteer, fetchClassName } from '../actions/controlpanelActions';

import Tag from '../components/Tag.jsx';
import Timer from '../components/Timer.jsx';
import StudentFilterForm from '../components/StudentFilterForm.jsx';

const Materialize = window.Materialize;

let timerInterval;

class ControlPanel extends React.Component {
    componentWillMount() {
        const { fetchClassName, fetchAvailableVolunteers, fetchPreviousVolunteers, controlPanelState } = this.props;
        fetchClassName();
        fetchAvailableVolunteers();
        fetchPreviousVolunteers();
        this.socket = io();

        this.formValues = {
            tags: [],
            students: []
        };
    }

    componentDidMount() {
        timerInterval = setInterval(() => {
            this.props.incrementTimers();
        }, 1000);
    }

    componentDidUpdate() {
        $('.collapsible').collapsible();
    }

    componentWillUnmount() {
        clearInterval(timerInterval);
    }

    addTag() {
        let tag = $('#addTagInput').val().toLowerCase();
        if(tag == '') {
            return;
        }
        if(this.formValues.tags.indexOf(tag) != -1) {
            Materialize.toast('This tag already exists!', 4000);
            return;
        }
        this.formValues.tags.push(tag);
        this.props.modifyTags(this.formValues.tags);
        $('#addTagInput').val('');
    }

    removeTag(index) {
        this.formValues.tags.splice(index, 1);
        this.props.modifyTags(this.formValues.tags);
    }

    removeStudent(index) {
        this.formValues.students = this.props.controlPanelState.students;
        this.formValues.students.splice(index, 1);
        this.props.modifyStudents(this.formValues.students);
    }

    get() {
        const { controlPanelState, insertRandomizedVolunteer } = this.props;

        if(controlPanelState.availableVolunteers.length === 0) {
            Materialize.toast('Your class has no students yet.', 4000);
            return;
        }

        let studentsToChooseFrom = [],
            selectedVolunteers = [],
            volunteerTags = [],
            count = {},
            nVolunteers = $.isNumeric($('#nVolunteers').val()) ? $('#nVolunteers').val() : 1,
            maxRepeats = $.isNumeric($('#maxRepeats').val()) ? $('#maxRepeats').val() : 1;

        if($('#remember-checkbox')[0].checked) {
            controlPanelState.previousVolunteers.forEach((volunteer) => {
                count[volunteer.StudentId] = count[volunteer.StudentId] ? count[volunteer.StudentId] + 1 : 1;
            });

            // count how many times the student has been volunteered in this activity
            controlPanelState.availableVolunteers.forEach((student) => {
                if(!count[student.id] || count[student.id] < maxRepeats) {
                    studentsToChooseFrom.push(student);
                }
            });
        } else {
            studentsToChooseFrom = _.map(controlPanelState.availableVolunteers, _.clone);
        }

        if(nVolunteers > controlPanelState.availableVolunteers.length) {
            Materialize.toast('Number of volunteers to select is too large!', 4000);
            return;
        }

        // if "Students To Call" is not empty
        if(controlPanelState.students.length > 0) {
            let studentsToCall = _.map(controlPanelState.students, _.clone);
            for(let i = 0; i < nVolunteers; i++) {
                if(i == controlPanelState.students.length) {
                    break;
                }

                let student = studentsToCall[Math.floor(Math.random() * studentsToCall.length)];

                if($('#timer-checkbox')[0].checked) {
                    this.addTimer(student.id);
                }
                selectedVolunteers.push(student);
                insertRandomizedVolunteer(student);
                studentsToCall.splice(studentsToCall.indexOf(student), 1);
            }
        }

        // if enough volunteers has been selected
        if(selectedVolunteers.length == nVolunteers) {
            $('#randomize').attr('disabled', true);
            setTimeout(function() {
                $('#randomize').attr('disabled', false);
            }, selectedVolunteers.length * 3500);
            this.socket.emit('send volunteers', selectedVolunteers);
            return;
        }

        if(studentsToChooseFrom.length == 0) {
            Materialize.toast('With the current filters, no more students can be volunteered for this class!', 4000);
            return;
        }

        // if "Tags" is not empty
        if(this.formValues.tags.length > 0) {
            this.formValues.tags.forEach((tag) => {
                studentsToChooseFrom.forEach((volunteer) => {
                    let tags = [];
                    volunteer.tags.forEach((volunteerTag) => {
                        tags.push(volunteerTag.toLowerCase());
                    });
                    if(tags.indexOf(tag) != -1) {
                        volunteerTags.push(volunteer);
                    }
                });
            });
        }

        // actual randomization
        for(let i = selectedVolunteers.length; i < nVolunteers; i++) {
            if (this.formValues.tags.length > 0) {
                if(volunteerTags.length == 0) {
                    Materialize.toast('No more students can be volunteered for this activity!', 4000);
                    break;
                }

                if(volunteerTags.length == 0) {
                    Materialize.toast('Number of volunteers to select is too large! Untick "Enable Remembering" and try again.', 4000);
                    return;
                }

                if(nVolunteers > controlPanelState.availableVolunteers.length) {
                    Materialize.toast('Number of volunteers to select is too large!', 4000);
                    return;
                }

                let student = volunteerTags[Math.floor(Math.random() * volunteerTags.length)];
                volunteerTags.splice(student, 1);
                studentsToChooseFrom.splice(student, 1);

                if(!student) {
                    Materialize.toast('No one matched the filters you have provided!', 4000);
                    return;
                }

                if($('#remember-checkbox')[0].checked) {
                    volunteerTags.splice(volunteerTags.indexOf(student), 1);
                }

                if($('#timer-checkbox')[0].checked) {
                    this.addTimer(student.id);
                }
                selectedVolunteers.push(student);
            }
            else {
                if(studentsToChooseFrom.length == 0) {
                    Materialize.toast('No more students can be volunteered for this activity!', 4000);
                    break;
                }

                let student = studentsToChooseFrom[Math.floor(Math.random() * studentsToChooseFrom.length)];
                volunteerTags.splice(student, 1);
                studentsToChooseFrom.splice(student, 1);

                if($('#timer-checkbox')[0].checked) {
                    this.addTimer(student.id);
                }
                selectedVolunteers.push(student);
                if($('#remember-checkbox')[0].checked) {
                    studentsToChooseFrom.splice(studentsToChooseFrom.indexOf(student), 1);
                }
            }

            // add timer if applicable
            if($('#timer-checkbox')[0].checked) {
                selectedVolunteers.forEach((volunteer) => {
                    this.addTimer(volunteer.id);
                });
            }

            insertRandomizedVolunteer(selectedVolunteers[i]);
        }
        $('#randomize').attr('disabled', true);
        setTimeout(function() {
            $('#randomize').attr('disabled', false);
        }, selectedVolunteers.length * 3500);
        this.socket.emit('send volunteers', selectedVolunteers);
    }

    addTimer(studentId) {
        this.props.addTimer(studentId);
    }

    incrementTimers() {
        this.props.incrementTimers();
    }

    removeTimer(studentId) {
        return this.props.removeTimer;
    }

    render() {
        const { controlPanelState } = this.props;

        let listOfTags = [],
            listOfStudents = [],
            classStudents = [];

        for(let i = 0; i < controlPanelState.tags.length; i++) {
            listOfTags.push(
                <div key={i} className="tagLabel">
                    {controlPanelState.tags[i]} <a className="btn-flat" onClick={() => this.removeTag(i)}><i className="material-icons right">close</i></a>
                </div>
            );
        }

        for(let i = 0; i < controlPanelState.students.length; i++) {
            listOfStudents.push(
                <li className="collection-item" key={i}>
                    <div className="row">
                        <div className="right">
                            <a className="btn-flat" onClick={() => this.removeStudent(i)}><i className="material-icons">close</i></a>
                        </div>
                        <i className="material-icons circle">perm_contact_calendar</i> {controlPanelState.students[i].fname} {controlPanelState.students[i].lname}
                    </div>
                </li>
            );
        }

        controlPanelState.availableVolunteers.forEach((student) => {
            let image;
            if(!student.image) {
                image = '/img/defaultPP.png';
            }
            else {
                image = '/uploads/' + student.image;
            }
            classStudents.push(<li className="collection-item">
                <img className="img-avatar" src={image} alt=""  style={{float: 'left', height: '45px', width: '45px', marginRight:'10px'}}/>
                {student.fname + " " + student.mname + " " + student.lname}
                <div className="font-w400 text-muted">
                    <small>
                        {student.tags.map((tag) =>
                            <Tag
                                key={tag}
                                name={tag}/>
                        )}
                    </small>
                </div>
            </li>);
        });

        return (
            <div>
                {/* START MAIN */}
                <div id="main" >
                  <Link className="waves-effect waves-light btn-floating btn-large modal-trigger" to="/presentation" target="_blank" style={{position: 'fixed', bottom:'20px',right:'20px'}}><i className="tiny material-icons">play_arrow</i></Link>
                {/* START WRAPPER */} <div className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m5 l4" data-collapsible="accordion">
                                {/* <div className="card-panel'> */}
                                <ul className="collection  with-header">
                                    <li className="collection-header center">
                                        <div className="container">
                                            <h5>{controlPanelState.className}</h5>
                                        </div>
                                    </li>
                                    {classStudents}
                                    </ul>
                                    {/* </div> */}
                                </div>

                                <div className="col s12 m7 l8">
                                    <div className="card-panel col s12 m12 l12">
                                        <div className="row">
                                            <div style={{padding: '5px 35px'}}>
                                                <br/>
                                                <h4 className="bold">Filters</h4>
                                                <div className="col s4 m6 l5">
                                                    <h6>N Students to Call</h6>
                                                    <input id="nVolunteers" type="text" className="validate" defaultValue="1"/>
                                                    {/* <label for="nStudents">N Students to Call</label> */}

                                                </div>
                                                <div className="col s4 m6 l5">
                                                    <h6>Max Repetition</h6>
                                                    <input id="maxRepeats" type="text" className="validate" defaultValue="1"/>
                                                    {/* <label for="maxRepeats">Max Repetition</label> */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{padding: '5px 35px'}}>
                                                <div className="input-field col s12 m10 l10">
                                                    <h6>Tags</h6>
                                                    <blockquote>
                                                        {listOfTags}
                                                        <div className="row">
                                                            <div className="col s10">
                                                                <input id="addTagInput" type="text" />
                                                            </div>
                                                            <div className="col s2 center">
                                                                <button className="btn waves-effect waves-light grey darken-3 z-depth-0" onClick={() => this.addTag()}><i className="material-icons">add</i></button>
                                                            </div>
                                                        </div>
                                                    </blockquote>
                                                    {/* <label className="bold' for="textarea1">Tags</label> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{padding: '5px 35px'}}>
                                            <div className="col s12 m12 l12">
                                                <p>
                                                    <input type="checkbox" id="timer-checkbox"/>
                                                    <label htmlFor="timer-checkbox">Enable Timer</label>
                                                </p>
                                                <p>
                                                    <input type="checkbox" id="remember-checkbox" defaultChecked="true"/>
                                                    <label htmlFor="remember-checkbox">Enable Remembering</label>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row" style={{padding: '5px 35px'}}>
                                            <div className="col s12 m12 l12">
                                                <button id="randomize" className="btn waves-effect waves-light grey darken-3 z-depth-0" name="action" onClick={() => this.get()}>Randomize</button>
                                            </div>
                                        </div>
                                        <br/><hr/><br/>
                                        <div className="row">
                                            <div className="container">
                                                <ul className="collection with-header">
                                                    <li className="collection-header">
                                                        <h5>Students to Call</h5>
                                                    </li>
                                                    <div style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}>
                                                    {listOfStudents}
                                                    </div>
                                                </ul>
                                                <StudentFilterForm
                                                    students={controlPanelState.availableVolunteers}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ul style={{position: "fixed", right: "2em", top: "8em"}}>
                                    {this.props.controlPanelState.timer.map((timer) => {
                                        let student = _.find(this.props.controlPanelState.availableVolunteers, (o) => o.id === timer.studentId);
                                        let img;

                                        if(!student.image) {
                                            img = '/img/defaultPP.png';
                                        }
                                        else {
                                            img = '/uploads/' + student.image;
                                        }

                                        return (
                                            <li key={student.id} style={{marginBottom: "2em"}}>
                                                <Timer
                                                    img={img}
                                                    studentId={student.id}
                                                    name={student.fname}
                                                    timer={timer.timer}
                                                    removeTimer={this.removeTimer(student.id)}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    controlPanelState: PropTypes.object.isRequired,
    fetchAvailableVolunteers: PropTypes.func.isRequired,
    modifyTags: PropTypes.func.isRequired,
    addTimer: PropTypes.func.isRequired,
    incrementTimers: PropTypes.func.isRequired,
    removeTimer: PropTypes.func.isRequired,
    modifyStudents: PropTypes.func.isRequired,
    insertRandomizedVolunteer: PropTypes.func.isRequired,
    fetchPreviousVolunteers: PropTypes.func.isRequired,
    fetchClassName: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ controlPanelState: state.controlPanelState }),
    { fetchAvailableVolunteers, fetchPreviousVolunteers, modifyTags, addTimer, incrementTimers, removeTimer, modifyStudents, insertRandomizedVolunteer, fetchClassName }
)(ControlPanel);
