// This is an example page. Use this as your guideline when you make your own page.

// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import NavBar from '../components/NavBar.jsx';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;

// Be sure to rename your className name
class StudentPage extends React.Component {
    componentDidMount() {

        $('.modal-trigger').leanModal();
        // code
        //Materialize.toast('Hey, JS works now!', 4000, 'green white-text');
    }

    render() {
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

                                        <figure className="card-profile-image">
                                            <img src="/img/defaultPP.png" alt="profile image" className="circle z-depth-1 responsive-img activator" style={{
                                                width: '20%',
                                                height: '20%'
                                            }}/>
                                        </figure>
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="col s3 offset-s2">
                                                    <h4 className="card-title grey-text text-darken-4">Roger Waters</h4>
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
                  <a href="#editstudent"className="waves-effect waves-light btn modal-trigger" style={{color:'white'}}><i className="material-icons left">mode_edit</i>Edit</a>
                  <a className="waves-effect waves-light btn red modal-trigger"><i className="material-icons left">delete</i>Delete</a>
                </div>

                <div id="editstudent" className="modal">
                    <div className="modal-content">
                        <h3>Edit Student</h3>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="lastName" type="text" className="validate"/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="firstName" type="text" className="validate"/>
                                <label htmlFor="firstName">First Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="studentNumber" type="text" className="validate"/>
                                <label htmlFor="studentNumber">Middle Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="middleName" type="text" className="validate"/>
                                <label htmlFor="middleName">Student Number</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="course" type="text" className="validate"/>
                                <label htmlFor="course">Course</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to="/classroom" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                        <Link to="/classroom" className="waves-effect waves-green btn-flat modal-action modal-close">Edit Student</Link>
                    </div>
                </div>
            </div>
        );
    }
}

// connect to redux store
export default StudentPage;
