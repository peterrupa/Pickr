// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import io from 'socket.io-client';

import { fetchAvailableVolunteers, modifyTags, modifyStudents } from '../actions/controlpanelActions';

const Materialize = window.Materialize;



// Be sure to rename your class name
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

    addTag() {
        if(this.formValues.tags.indexOf($('#addTagInput').val()) != -1) {
            Materialize.toast('This tag already exists!', 4000);
            return;
        }
        this.formValues.tags.push($('#addTagInput').val());
        this.props.modifyTags(this.formValues.tags);
    }

    removeTag(index) {
        this.formValues.tags.splice(index, 1);
        this.props.modifyTags(this.formValues.tags);
    }

    findStudent(fname, lname) {
        for(let i = 0; i < this.props.controlPanelState.availableVolunteers.length; i++) {
            if(this.props.controlPanelState.availableVolunteers[i].fname.toLowerCase() == fname.toLowerCase() && this.props.controlPanelState.availableVolunteers[i].lname.toLowerCase() == lname.toLowerCase()) {
                return this.props.controlPanelState.availableVolunteers[i];
            }
        }

        return false;
    }

    addStudent() {
        const { controlPanelState, modifyStudents } = this.props;

        if(controlPanelState.availableVolunteers.length === 0){
            return;
        }
        
        let student_fname = $('#inputFName').val();
        let student_lname = $('#inputLName').val();

        if(!student_fname && !student_lname) {
            return;
        }

        let student = this.findStudent(student_fname, student_lname);

        if(student) {
            this.formValues.students.push(student);
            modifyStudents(this.formValues.students);
        } else {
            Materialize.toast('Student not found!', 4000);
        }
        
        $('#inputFName').val('');
        $('#inputLName').val('');
    }

    removeStudent(index) {
        if(this.props.controlPanelState.availableVolunteers.length === 0){
            return;
        }
        
        this.formValues.students.splice(index, 1);
        this.props.modifyStudents(this.formValues.students);
    }

    get() {
        if(this.props.controlPanelState.availableVolunteers.length === 0) {
            Materialize.toast('Your class has no students yet.', 4000);
            return;
        }

        let selectedVolunteers = [];
        let volunteerTags = [];

        if(this.formValues.nVolunteers > this.props.controlPanelState.availableVolunteers.length) {
            Materialize.toast('Number of volunteers to select is too large!', 4000);
            return;
        }

        for(let i = 0; i < this.formValues.nVolunteers; i++) {
            if(i == this.formValues.students.length) {
                break;
            }

            selectedVolunteers.push(this.formValues.students[i]);
            fetch('/api/volunteer/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activityID: '1',
                    studentID: this.formValues.students[i].id,
                    classCode: this.formValues.students[i].ClassId,
                    note: ''
                })
            });
        }

        if(selectedVolunteers.length == this.formValues.nVolunteers) {
            this.socket.emit('send volunteers', selectedVolunteers);
            return;
        }

        for(let i = this.formValues.students.length; i < this.formValues.nVolunteers; i++) {
            if (this.formValues.tags.length > 0) {
                this.formValues.tags.forEach((tag) => {
                    this.props.controlPanelState.availableVolunteers.forEach((v) => {
                        if(v.tags.indexOf(tag) != -1) {
                            volunteerTags.push(v);
                        }
                    });
                });

                if(this.formValues.nVolunteers > this.props.controlPanelState.availableVolunteers.length) {
                    Materialize.toast('Number of volunteers to select is too large!', 4000);
                    return;
                }

                let student = volunteerTags[Math.floor(Math.random() * volunteerTags.length)];

                if(!student) {
                    Materialize.toast('No one matched the fliters you have provided!', 4000);
                    return;
                }

                selectedVolunteers.push(student);
            }
            else {
                selectedVolunteers.push(this.props.controlPanelState.availableVolunteers[Math.floor(Math.random() * this.props.controlPanelState.availableVolunteers.length)]);
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
                <div key={i}>
                    <li className="collection-item">
                        <div>
                            <i className="material-icons circle">perm_contact_calendar</i> {controlPanelState.students[i].fname} {controlPanelState.students[i].lname}
                            <button className="btn waves-effect waves-light grey darken-3" name="action" onClick={() => this.removeStudent(i)}>REMOVE</button>
                            <i className="material-icons">check</i>
                        </div>
                    </li>
                </div>
                
                
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
                                <button className="btn waves-effect waves-light grey darken-3" name="action" onClick={() => this.get()}>Randomize</button>
                            </div>
                        </div>
                        <br/><hr/><br/>
                        <div className="row">
                            <div className="container">
                                
                            
                            <input id="inputFName" type="text" placeholder="First Name" />
                            <input id="inputLName" type="text" placeholder="First Name" />
                            <button className="btn waves-effect waves-light grey darken-3" name="action" onClick={() => this.addStudent()}>ADD STUDENT</button>
                            
                            
                                <ul className="collection with-header">
                                    <li className="collection-header">
                                        <h5>Students to Call</h5>
                                    </li>
                                    {listOfStudents}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col s12 m7 offset-m5 l8 offset-l4">
                    <div className="card-panel col s12 m12 l12"></div>
                </div>
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
    modifyStudents: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ controlPanelState: state.controlPanelState }),
    { fetchAvailableVolunteers, modifyTags, modifyStudents }
)(ControlPanel);
