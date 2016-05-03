// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import io from 'socket.io-client';
import _ from 'lodash';

import { fetchAvailableVolunteers, modifyTags, addTimer, incrementTimers, removeTimer, modifyStudents } from '../actions/controlpanelActions';

import Timer from '../components/Timer.jsx';
import StudentFilterForm from '../components/StudentFilterForm.jsx';

const Materialize = window.Materialize;

let timerInterval;

class ControlPanel extends React.Component {
    componentWillMount() {
        const { fetchAvailableVolunteers, controlPanelState } = this.props;
        fetchAvailableVolunteers('1');
        this.socket = io();

        this.formValues = {
            nVolunteers: 1,
            tags: [],
            students: []
        };

        this.formActions = {
            nVolunteersOnChange: () => {
                let value = $('#nStudents').val();
                if($.isNumeric(value)) {
                    this.formValues.nVolunteers = value < 1 ? 1 : value;
                } else {
                    $('#nStudents').val(value.replace(/[^0-9]/g, ''));
                    this.formValues.nVolunteers = value ? value : 1;
                }
            }
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
        const { controlPanelState } = this.props;

        if(controlPanelState.availableVolunteers.length === 0) {
            Materialize.toast('Your class has no students yet.', 4000);
            return;
        }

        let studentsToChooseFrom = [];
        controlPanelState.availableVolunteers.forEach((volunteer) => {
            studentsToChooseFrom.push(volunteer);
        });

        let selectedVolunteers = [];
        let volunteerTags = [];

        if(this.formValues.nVolunteers > controlPanelState.availableVolunteers.length) {
            Materialize.toast('Number of volunteers to select is too large!', 4000);
            return;
        }

        for(let i = 0; i < this.formValues.nVolunteers; i++) {
            if(i == controlPanelState.students.length) {
                break;
            }

            selectedVolunteers.push(controlPanelState.students[i]);
            fetch('/api/volunteer/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activityID: '1',
                    studentID: controlPanelState.students[i].id,
                    classCode: controlPanelState.students[i].ClassId,
                    note: ''
                })
            });
        }

        if(selectedVolunteers.length == this.formValues.nVolunteers) {
            this.socket.emit('send volunteers', selectedVolunteers);
            return;
        }

        this.formValues.tags.forEach((tag) => {
            controlPanelState.availableVolunteers.forEach((volunteer) => {
                let tags = [];
                volunteer.tags.forEach((volunteerTag) => {
                    tags.push(volunteerTag.toLowerCase());
                });
                if(tags.indexOf(tag) != -1) {
                    volunteerTags.push(volunteer);
                }
            });
        });

        for(let i = selectedVolunteers.length; i < this.formValues.nVolunteers; i++) {
            if (this.formValues.tags.length > 0) {
                if(volunteerTags.length == 0) {
                    Materialize.toast('Number of volunteers to select is too large! Untick "Enable Remembering" and try again.', 4000);
                    return;
                }

                if(this.formValues.nVolunteers > controlPanelState.availableVolunteers.length) {
                    Materialize.toast('Number of volunteers to select is too large!', 4000);
                    return;
                }

                let student = volunteerTags[Math.floor(Math.random() * volunteerTags.length)];

                if(!student) {
                    Materialize.toast('No one matched the fliters you have provided!', 4000);
                    return;
                }

                if($('#remember-checkbox')[0].checked) {
                    volunteerTags.splice(volunteerTags.indexOf(student), 1);
                }
                selectedVolunteers.push(student);
            }
            else {
                let student = studentsToChooseFrom[Math.floor(Math.random() * studentsToChooseFrom.length)];

                selectedVolunteers.push(student);
                if($('#remember-checkbox')[0].checked) {
                    studentsToChooseFrom.splice(studentsToChooseFrom.indexOf(student), 1);
                }
                //selectedVolunteers.push(controlPanelState.availableVolunteers[Math.floor(Math.random() * controlPanelState.availableVolunteers.length)]);
            }
            
            // add timer if applicable
            if($('#timer-checkbox')[0].checked) {
                selectedVolunteers.forEach((volunteer) => {
                    this.addTimer(volunteer.id);
                });
            }

            fetch('/api/volunteer/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activityID: '1',
                    studentID: selectedVolunteers[i].id,
                    classCode: selectedVolunteers[i].ClassId,
                    note: ''
                })
            });
        }
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

        let listOfTags = [];
        let listOfStudents = [];

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

        return (
            <div>
                {/* START MAIN */}
                <div id="main" >
                {/* START WRAPPER */} <br /><br /><br /> <div className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m5 l4" data-collapsible="accordion">
                                {/* <div className="card-panel'> */}
                                <ul className="collapsible  with-header">
                                    <li className="collection-header center">
                                        <div className="container">
                                            <h5>CMSC 128</h5>
                                        </div>
                                    </li>
                                    <li className="collection-item avatar">
                                            <div className="collapsible-header">
                                                <i className="material-icons circle">perm_contact_calendar</i>
                                                <h6 className="bold" style={{paddingTop:'10px'}}>Dick Grayson</h6>
                                            </div>
                                            <div className="collapsible-body">
                                                <div className="container">
                                                    <br/>
                                                    <span className="bold">tags:</span>
                                                    <span>
                                                        <div className="tagLabel">AB</div>
                                                        <div className="tagLabel">AB3L</div>
                                                        <div className="tagLabel">boy</div>
                                                    </span>
                                                    <br/>
                                                    <span className="bold">notes</span>
                                                    <blockquote>
                                                        Will perform on Thursday, March 10
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="collection-item avatar">
                                            <div className="collapsible-header">
                                                <i className="material-icons circle">perm_contact_calendar</i>
                                                <h6 className="bold" style={{paddingTop:'10px'}}>Barbara Gordon</h6>
                                            </div>
                                            <div className="collapsible-body">
                                                <div className="container">
                                                    <br/>
                                                    <span className="bold">tags:</span>
                                                    <span>
                                                        <div className="tagLabel">AB</div>
                                                        <div className="tagLabel">AB4L</div>
                                                        <div className="tagLabel">girl</div>
                                                        <div className="tagLabel">topnotcher</div>
                                                    </span>
                                                    <br/>
                                                    <span className="bold">notes</span>
                                                    <blockquote>
                                                        Graduating
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="collection-item avatar">
                                            <div className="collapsible-header">
                                                <i className="material-icons circle">perm_contact_calendar</i>
                                                <h6 className="bold" style={{paddingTop:'10px'}}>Jason Todd</h6>
                                            </div>
                                            <div className="collapsible-body">
                                                <div className="container">
                                                    <br/>
                                                    <span className="bold">tags:</span>
                                                    <span>
                                                        <div className="tagLabel">AB</div>
                                                        <div className="tagLabel">AB1L</div>
                                                        <div className="tagLabel">boy</div>
                                                        <div className="tagLabel">delinquent</div>
                                                    </span>
                                                    <br/>
                                                    <span className="bold">notes</span>
                                                    <blockquote>
                                                        Incomplete (no first LE)
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="collection-item avatar">
                                            <div className="collapsible-header">
                                                <i className="material-icons circle">perm_contact_calendar</i>
                                                <h6 className="bold" style={{paddingTop:'10px'}}>Tim Drake</h6>
                                            </div>
                                            <div className="collapsible-body">
                                                <div className="container">
                                                    <br/>
                                                    <span className="bold">tags:</span>
                                                    <span>
                                                        <div className="tagLabel">AB</div>
                                                        <div className="tagLabel">AB1L</div>
                                                        <div className="tagLabel">boy</div>
                                                    </span>
                                                    <br/>
                                                    <span className="bold">notes</span>
                                                    <blockquote>
                                                        transferee
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="collection-item avatar">
                                            <div className="collapsible-header">
                                                <i className="material-icons circle">perm_contact_calendar</i>
                                                <h6 className="bold" style={{paddingTop:'10px'}}>Damian Wayne</h6>
                                            </div>
                                            <div className="collapsible-body">
                                                <div className="container">
                                                    <br/>
                                                    <span className="bold">tags:</span>
                                                    <span>
                                                        <div className="tagLabel">AB</div>
                                                        <div className="tagLabel">AB1L</div>
                                                        <div className="tagLabel">boy</div>
                                                        <div className="tagLabel">delinquent</div>
                                                    </span>
                                                    <br/>
                                                    <span className="bold">notes</span>
                                                    <blockquote>
                                                        no exer 2
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </div>

                                <div className="col s12 m7 l8">
                                    <div className="card-panel col s12 m12 l12">
                                        <div className="row">
                                            <div style={{padding: '5px 35px'}}>
                                                <br/>
                                                <h4 className="bold">Filters</h4>
                                                <form className="col s4 m6 l5">
                                                    <h6>N Students to Call</h6>
                                                    <input id="nStudents" type="text" className="validate" onChange={this.formActions.nVolunteersOnChange}/>
                                                    {/* <label for="nStudents">N Students to Call</label> */}

                                                </form>
                                                <form className="col s4 m6 l5">
                                                    <h6>N Students Per Tag</h6>
                                                    <input id="nStudentsPerTag" type="text" className="validate"/>
                                                    {/* <label for="nStudents">N Students Per Tag</label> */}
                                                </form>

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
                                                                <button className="btn waves-effect waves-light grey darken-3" onClick={() => this.addTag()}><i className="material-icons">add</i></button>
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
                                                    <input type="checkbox" id="remember-checkbox"/>
                                                    <label htmlFor="remember-checkbox">Enable Remembering</label>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row" style={{padding: '5px 35px'}}>
                                            <div className="col s12 m12 l12">
                                                <button className="btn waves-effect waves-light grey darken-3" name="action" onClick={() => this.get()}>Randomize</button>
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
    modifyStudents: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ controlPanelState: state.controlPanelState }),
    { fetchAvailableVolunteers, modifyTags, addTimer, incrementTimers, removeTimer, modifyStudents }
)(ControlPanel);
