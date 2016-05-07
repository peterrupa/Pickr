import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavBar from '../components/NavBar.jsx';
import {fetchStudent, editStudent } from '../actions/studentActions.js';
import StudentEditModal from '../components/StudentEditModal.jsx';
import HighCharts from 'highcharts';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;

// Be sure to rename your className name
class StudentPage extends React.Component {
    componentWillMount() {
        let studentId = window.location.pathname.substring(9);
        this.props.fetchStudent(studentId);
    }

    componentDidMount(){
        let student = this.props.studentAppState.student;
        $('.modal-trigger').leanModal();
        
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
                categories: [
                    'activity1',
                    'activity2',
                    'activity3',
                    'activity4',
                    'activity5'
                ],
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
                data: [15,23,12,5,8]
            }]
        });
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

    render() {
        let student = this.props.studentAppState.student;
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
                                                    <h4 className="card-title grey-text text-darken-4">10</h4>
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
                  <a href="#editstudent"className="waves-effect waves-light btn modal-trigger" style={{color:'white'}}><i className="material-icons left">mode_edit</i>Edit</a>
                  <a className="waves-effect waves-light btn red modal-trigger"><i className="material-icons left">delete</i>Delete</a>
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
            </div>
        );
    }
}

StudentPage.propTypes = {
    studentAppState: PropTypes.object.isRequired,
    fetchStudent: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired
};

// connect to redux store
export default connect(state => ({
    studentAppState: state.studentAppState
}), {
    fetchStudent,
    editStudent
})(StudentPage);