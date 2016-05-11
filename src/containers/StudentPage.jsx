import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavBar from '../components/NavBar.jsx';
import { fetchStudent, editStudent, deleteStudent , fetchStudentVolunteer, fetchVolunteerActivities } from '../actions/studentActions.js';
import StudentEditModal from '../components/StudentEditModal.jsx';
import HighCharts from 'highcharts';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;

// Be sure to rename your className name
class StudentPage extends React.Component {
    componentWillMount() {
        let studentId = window.location.pathname.substring(9);
        this.props.fetchStudent(studentId);
        this.props.fetchStudentVolunteer(studentId);
        this.props.fetchVolunteerActivities(studentId);
    }

    componentDidMount(){
        //let student = this.props.studentAppState.student;
        $('.modal-trigger').leanModal();
    }

    edit(e){
        e.preventDefault();
        let student = {
            path: window.location.pathname.substring(9),
            fname: $('#efirstName'+student.id).val(),
            lname: $('#elastName'+student.id).val(),
            mname: $('#emiddleName'+student.id).val()
            //image: $('#image')[0].files[0]
        };

        this.props.editStudent(student).then((res) => {
            Materialize.toast('Successfully edited student.', 4000, 'toast-success');
            $('#edit-student-form')[0].reset();
            $('#editStudent').scrollTop(0);
        })
        .catch((err) => {
            Materialize.toast('Error editing student.', 4000, 'toast-error');
            $('#edit-student-form')[0].reset();
            $('#editStudent').scrollTop(0);
        });
    }
    
    delete(e) {
        e.preventDefault();
        
        deleteStudent(this.props.studentAppState.student).then((res) => {
            window.location = "/classroom/"+this.props.studentAppState.student.ClassID;
        })
        .catch((err) => {
            Materialize.toast('Error deleting student.', 4000, 'toast-error');
        });
    }

    render() {
        let student = this.props.studentAppState.student;
        let attempts = this.props.studentAppState.attempts;
        let activities = this.props.studentAppState.activities;
      //  console.log(activities);
        let attemptCount = {};
        attempts.forEach(function(attempt){
            if(attemptCount[attempt.ActivityId] == undefined || attemptCount[attempt.ActivityId] == null) attemptCount[attempt.ActivityId] = 1;
            else attemptCount[attempt.ActivityId] += 1;
        });


        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '5 Most Participated Activities'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories:(function() {
                    let labels = [];
                    let keysSorted = Object.keys(attemptCount).sort(function(a,b){return attemptCount[b]-attemptCount[a];});
                    keysSorted.forEach(function(key){
                        for(let i = 0; i < activities.length; i++){
                            if(activities[i].id.toString() == key){
                                labels.push(activities[i].activityName.toString());
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
                    text: 'Number of times used/called'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:f} times</b></td></tr>',
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
            series: [{
                name: 'Activity',
                data: (function() {
                    // generate an array of random data
                    let values = [];
                    let keysSorted = Object.keys(attemptCount).sort(function(a,b){return attemptCount[b]-attemptCount[a];});
                    for(let i = 0; i < 5 ; i++){
                        values.push(attemptCount[keysSorted[i]]);
                    }
                    return values;
                }())
            }]
        });

        let image;

        if(!student.image) {
            image = '/img/defaultPP.png';
        }
        else {
            image = '/uploads/' + student.image;
        }

        return (
            <div>
                <div id="main">
                    {/* <!-- START WRAPPER -->*/}
                    <div className="wrapper">

                        {/* <!-- //////////////////////////////////////////////////////////////////////////// -->*/}

                        {/*<!-- START CONTENT -->*/}
                        <section id="content">

                            {/*<!--start container-->*/}
                            <div className="container">

                                <div id="profile-page" className="section">
                                    {/*<!-- profile-page-header -->*/}
                                    <div id="profile-page-header" className="card-panel">

                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <Link to={"/classroom/"+student.ClassId}> <i className="material-icons left">assignment</i> Back to Class</Link>
                                            </div>
                                        </div>
                                        <figure className="card-profile-image">
                                            <img src={image} alt="profile image" className="circle z-depth-1 responsive-img activator" style={{
                                                width: '20%',
                                                height: '20%'
                                            }}/>
                                        </figure>
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="col s12 m12 l6 center">
                                                    <h4 className="card-title grey-text text-darken-4">{student.fname + " " + student.mname + " " + student.lname}</h4>
                                                    <p className="medium-small grey-text">Student</p>
                                                </div>
                                                <div className="col s12 m12 l6 center">
                                                    <h4 className="card-title grey-text text-darken-4">{attempts.length}</h4>
                                                    <p className="medium-small grey-text">Number of times called</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--/ profile-page-header -->*/}

                                </div>
                                {/*<!-- END WRAPPER -->*/}

                            </div>
                            {/*<!-- END MAIN -->*/}
                        </section>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div id="container" style={{minWidth: '310px', height: '400px', margin: '1% auto'}}></div>
                        </div>
                    </div>
                </div>
                <div className="row center">
                    <a href="#editstudent" className="waves-effect waves-light btn modal-trigger hide-on-med-and-down" style={{color:'white'}}><i className="material-icons left">mode_edit</i>Edit</a>
                    <a href="#deletestudent" className="waves-effect waves-light btn red modal-trigger hide-on-med-and-down" style={{marginLeft: '10px'}}><i className="material-icons left">delete</i>Delete</a>
                    <a href="#editstudent" className="waves-effect waves-light btn modal-trigger hide-on-large-only" style={{color:'white',
                        paddingLeft:'20px',
                        paddingRight:'20px'}}>
                        <i className="mdi-image-edit"></i>
                    </a>
                    <a href="#deletestudent" className="waves-effect waves-light btn red modal-trigger hide-on-large-only" style={{marginLeft: '5px',
                        paddingLeft:'20px',
                        paddingRight:'20px'}}>
                        <i className="mdi-action-delete"></i>
                    </a>
                </div>

                <div id="editstudent" className="modal">
                  <form onSubmit={(e) => this.edit(e)} id="edit-student-form">
                      <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <span>
                                  <label>Last Name</label>
                                </span>
                                <br/>
                                <input id={"elastName"+student.id} type="text" className="validate"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <span>
                                  <label>First Name</label>
                                </span>
                                <br/>
                                <input id={"efirstName"+student.id} type="text" className="validate"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <span>
                                  <label>Middle Name</label>
                                </span>
                                <br/>
                                <input id={"emiddleName"+student.id} type="text" className="validate"/>
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
                                  <input id={"eimage"} type="file"/>
                              </div>
                              <div className="file-path-wrapper">
                                  <input className="file-path validate" type="text"/>
                              </div>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                          <button type="submit" className="waves-effect waves-green btn-flat modal-action modal-close">Edit Student</button>
                      </div>
                  </form>
                </div>
                
                <div id="deletestudent" className="modal">
                    <div className="row">
                        <div className="col s12">
                            <h3> Are you sure you want to delete this student? </h3>
                        </div>
                        <div className="row">
                            <div className="col s12">
                            <h5> This action cannot be undone </h5>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                        <button onClick={(e) => this.delete(e)}className="waves-effect waves-green btn-flat modal-action modal-close">Delete Student</button>
                    </div>
                </div>
            </div>
        );
    }
}

StudentPage.propTypes = {
    studentAppState: PropTypes.object.isRequired,
    fetchStudent: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired,
    fetchStudentVolunteer: PropTypes.func.isRequired,
    fetchVolunteerActivities: PropTypes.func.isRequired
};

// connect to redux store
export default connect(state => ({
    studentAppState: state.studentAppState
}), {
    fetchStudent,
    editStudent,
    fetchStudentVolunteer,
    fetchVolunteerActivities
})(StudentPage);
