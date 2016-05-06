import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavBar from '../components/NavBar.jsx';
import HighCharts from 'highcharts';

import './../styles/styles.scss';
import './../styles/style.css';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;

// Be sure to rename your className name
class StudentPage extends React.Component {
    componentDidMount() {

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

                <div id="container" className="col s6" style={{minWidth: '310px', height: '400px', margin: '1% auto'}}></div>
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
                                <input id="middleName" type="text" className="validate"/>
                                <label htmlFor="middleName">Middle Name</label>
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

StudentPage.propTypes = {
    studentAppState: PropTypes.object.isRequired
  //  fetchStudent: PropTypes.func.isRequired
};

// connect to redux store
export default StudentPage;
//state => ({studentAppState : state,studentAppState }),
//    { fetchStudent}
//)(StudentPage);
