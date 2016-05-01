import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavBar from '../components/NavBar.jsx';
import {fetchStudent, editStudent } from '../actions/studentActions.js';
import StudentEditModal from '../components/StudentEditModal.jsx';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;

// Be sure to rename your className name
class StudentPage extends React.Component {
    componentWillMount() {
        let studentId = window.location.pathname.substring(9);
        this.props.fetchStudent(studentId);
    }

    componentDidMount(){
        $('.modal-trigger').leanModal();
    }

    edit(e){
        e.preventDefault();
        let student = {
            id: this.props.studentAppState.student.id,
            fname: $('#firstname').val(),
            lname: $('#lastname').val(),
            mname: $('#middlename').val()
            //image: $('#image')[0].files[0]
        };

        this.props.editStudent(student).then((res) => {
            Materialize.toast('Successfully edited student.', 4000, 'toast-success');
            $('#edit-student-form')[0].reset();
            $('#editStudent').scrollTop(0);
            $('#firstname').val(student.fname);
            $('#lastname').val(student.lname);
            $('#middlename').val(student.mname);
        })
        .catch((err) => {
            Materialize.toast('Error editing student.', 4000, 'toast-error');
            $('#edit-student-form')[0].reset();
            $('#editStudent').scrollTop(0);
        });
    }

    delete(e) {
        let student = this.props.studentAppState.student;
        alert(JSON.stringify(student));


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

        $('#firstname').val(student.fname);
        $('#lastname').val(student.lname);
        $('#middlename').val(student.mname);

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
                                    <div id="profile-page-header" className="card" style={{paddingTop:'6%'}}>

                                        <Link to={"/classroom/"+student.ClassId}> <i className="material-icons left">assignment</i> Back to Class</Link>
                                        <figure className="card-profile-image">
                                            <img src={image} alt="profile image" className="circle z-depth-1 responsive-img activator" style={{
                                                width: '20%',
                                                height: '20%'
                                            }}/>
                                        </figure>
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="col s3 offset-s2">
                                                    <h4 className="card-title grey-text text-darken-4">{student.fname + " " + student.mname + " " + student.lname}</h4>
                                                    <p className="medium-small grey-text">Student</p>
                                                </div>
                                                <div className="col s2 center-align">
                                                    <h4 className="card-title grey-text text-darken-4">10</h4>
                                                    <p className="medium-small grey-text">Number of times called</p>
                                                </div>
                                                <div className="col s2 center-align">
                                                    <h4 className="card-title grey-text text-darken-4">6</h4>
                                                    <p className="medium-small grey-text">Number of correct answers</p>
                                                </div>
                                                <div className="col s2 center-align">
                                                    <h4 className="card-title grey-text text-darken-4">53.74564%</h4>
                                                    <p className="medium-small grey-text">Chances to be called</p>
                                                </div>
                                                <div className="col s1 right-align">
                                                    <a className="btn-floating activator waves-effect waves-light darken-2 right">
                                                        <i className="mdi-action-perm-identity"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-reveal">
                                            <br/>
                                            <p>
                                                <span className="card-title grey-text text-darken-4">Roger Waters
                                                    <i className="mdi-navigation-close right"></i>
                                                </span>
                                                <span>
                                                    <i className="mdi-action-perm-identity cyan-text text-darken-2"></i>
                                                    Student
                                                </span>
                                            </p>

                                            <p>This student is so bibo, like so angas in his answers pero walang point? get my point?</p>

                                            <p>
                                                <i className="mdi-action-perm-phone-msg cyan-text text-darken-2"></i>
                                                +1 (612) 222 8989</p>
                                            <p>
                                                <i className="mdi-communication-email cyan-text text-darken-2"></i>
                                                mail@domain.com</p>
                                            <p>
                                                <i className="mdi-social-cake cyan-text text-darken-2"></i>
                                                18th June 1990</p>
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
                <div className="row center">
                  <a href="#editstudent" className="waves-effect waves-light btn modal-trigger" style={{color:'white'}}><i className="material-icons left">mode_edit</i>Edit</a>
                  <a href="#deletestudent" className="waves-effect waves-light btn red modal-trigger"><i className="material-icons left">delete</i>Delete</a>
                </div>

                <div id="deletestudent" className="modal">
                  <div className="modal-content">
                    <div className="row">
                        <div className="input-field col s12">
                            <span>
                              <h2> Are you sure you want to delete this student?</h2>
                              <br/>
                              <h4> WARNING: Action cannot be undone </h4>
                            </span>
                        </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                      <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                      <button to={"/classroom/student.ClassId"} onClick={(e) => this.delete(e)} className="waves-effect waves-green btn-flat modal-action modal-close"> Delete </button>
                  </div>
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
                                <input id="lastname" type="text" className="validate" defaultValue={this.props.studentAppState.student.lname}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <span>
                                  <label>First Name</label>
                                </span>
                                <br/>
                                <input id="firstname" type="text" className="validate" defaultValue={this.props.studentAppState.student.fname}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <span>
                                  <label>Middle Name</label>
                                </span>
                                <br/>
                                <input id="middlename" type="text" className="validate" defaultValue={this.props.studentAppState.student.mname}/>
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
