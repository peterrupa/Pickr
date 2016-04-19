// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import '../styles/oneUI.css';

import HighCharts from 'highcharts';

// Be sure to rename your class name
class ClassRoom extends React.Component {
    componentDidMount(){
        $('.modal-trigger').leanModal();

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
         theme: {

         },
         xAxis: {
             categories: [
                 'male',
                 'ab-3l',
                 'pogi',
                 'ganda',
                 'bibo'
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
             name: 'Tags',
             data: [15,23,12,5,8]
         }]
     });

    }
    addTag(){
        let text = $(" #tag ").val();
        $(" .inputTags").append("#"+text+" ");
        $(" #tag ").val("");
    }


    render() {
        return (
            <div className="wrapper">
                <div className="tint">
                    <div className="content bg-image overflow-hidden" style={{backgroundImage: 'url(' +'/img/bg.jpg'+')'}}>
                        <div className="push-50-t push-20">
                            <h1 className="h2 text-white animated zoomIn">WELCOME TO CMSC 170!</h1>
                            <h2 className="h5 text-white-op animated zoomIn">Introduction to Artificial Intelligence</h2>
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
                            <Link className="h2 font-w300 text-primary animated flipInX" to="#">150</Link>
                        </div>
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">TOTAL CALLED</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    Today</small>
                            </div>
                            <Link className="h2 font-w300 text-primary animated flipInX" to="#">5</Link>
                        </div>
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">TOTAL CALLED</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    This Month</small>
                            </div>
                            <Link className="h2 font-w300 text-primary animated flipInX" to="#">430</Link>
                        </div>
                        <div className="col s12 m6 l3">
                            <div className="font-w700 text-gray-darker animated fadeIn">ANSWERED</div>
                            <div className="text-muted animated fadeIn">
                                <small>
                                    <i className="tiny material-icons">today</i>
                                    All Time</small>
                            </div>
                            <Link className="h2 font-w300 text-primary animated flipInX" to="#">20</Link>
                        </div>
                    </div>
                </div>
                <div id="container" className="col s6" style={{minWidth: '310px', height: '400px', margin: '1% auto'}}></div>

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
                                        <div className="file_input">
                                          <label className="image_input_button mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored">
                                            <i className="material-icons right">folder</i>
                                            <input id="file_input_file" className="none" type="file" />
                                          </label>
                                        </div>
                                    </li>
                                </ul>
                                <h3 className="block-title">Students</h3>
                            </div>
                            <div className="block-content">
                                <ul className="task-card">
                                    <li>
                                        <Link to="/student">

                                            <Link className="modal-trigger" to="#editstudent" style={{color:'gray'}}>
                                                <i className="material-icons right">mode_edit</i>
                                            </Link>
                                            <Link className="modal-trigger" to="#deletestudent" style={{color:'gray'}}>
                                                <i className="material-icons right">delete</i>
                                            </Link>
                                            <img className="img-avatar" src="/img/pic.jpg" alt=""  style={{float: 'left', height: '45px', width: '45px', marginRight:'10px'}}/>
                                            Amanda Powell
                                            <div className="font-w400 text-muted">


                                                <small>
                                                    <span className="task-cat purple" style={{color:'white'}}>&nbsp;tag1&nbsp;</span>
                                                    <span className="task-cat orange" style={{color:'white'}}>&nbsp;tag2&nbsp;</span>
                                                    <span className="task-cat green" style={{color:'white'}}>&nbsp;tag3&nbsp;</span>
                                                </small>

                                            </div>
                                        </Link>
                                    </li>
                                    <br />
                                    <li>
                                        <Link to="student">

                                            <Link className="modal-trigger" to="#editstudent" style={{color:'gray'}}>
                                                <i className="material-icons right">mode_edit</i>
                                            </Link>
                                            <Link className="modal-trigger" to="#deletestudent" style={{color:'gray'}}>
                                                <i className="material-icons right">delete</i>
                                            </Link>
                                            <img className="img-avatar" src="/img/pic.jpg" alt=""  style={{float: 'left', height: '45px', width: '45px', marginRight:'10px'}}/>
                                            Joshua Munoz
                                            <div className="font-w400 text-muted">
                                                <small>
                                                    <span className="task-cat purple" style={{color:'white'}}>&nbsp;tag1&nbsp;</span>
                                                </small>


                                            </div>
                                        </Link>
                                    </li>
                                    <br />
                                    <li>
                                        <Link to="student">

                                            <Link className="modal-trigger" to="#editstudent" style={{color:'gray'}}>
                                                <i className="material-icons right">mode_edit</i>
                                            </Link>
                                            <Link className="modal-trigger" to="#deletestudent" style={{color:'gray'}}>
                                                <i className="material-icons right">delete</i>
                                            </Link>
                                            <img className="img-avatar" src="/img/pic.jpg" alt=""  style={{float: 'left', height: '45px', width: '45px', marginRight:'10px'}}/>
                                            Amber Walker
                                            <div className="font-w400 text-muted">
                                                <small>
                                                    <span className="task-cat pink" style={{color:'white'}}>&nbsp;tag1&nbsp;</span>
                                                </small>
                                            </div>
                                        </Link>
                                    </li>
                                    <br />
                                </ul>
                            </div>
                            {/*block cntent*/}
                        </div>
                    </div>
                    {/* product-card */}
                    <div className=" s6 m12 l4">
                        <ul id="task-card" className="collection with-header" style={{marginLeft: '15px',marginRight: '15px'}}>
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
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <label htmlFor="task1" style={{textDecoration: 'none'}}>
                                    <Link to="/presentation">Create Mobile App UI.
                                    </Link>
                                </label>
                                <Link to="controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <label htmlFor="task2" style={{textDecoration: 'none'}}>Check the new API standerds.
                                </label>
                                <Link to="/controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="/presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <label htmlFor="task3" style={{textDecoration: 'line-through'}}>Check the new Mockup of ABC.
                                </label>
                                <Link to="/controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="/presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <label htmlFor="task4" style={{textDecoration: 'line-through'}}>I did it !</label>
                                <Link to="/controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="/presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                        </ul>

                        {/* map-card */}

                    </div>
                    <div id="addstudent" className="modal">
                        <div className="modal-content">
                            <h3>Add Student</h3>
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
                            <div className="tags">
                              <div className="row">
                                  <div className="input-field col s11">
                                      <input id="tag" type="text" className=""/>
                                      <label htmlFor="tags">Tags</label>
                                  </div>
                                  <div className="valign-wrapper">
                                    <br/>
                                    <br/>
                                    <br/>
                                  <a className="btn-floating" onClick={this.addTag}><i className="material-icons">add</i></a>
                                  </div>

                                    <div className="inputTags"></div>
                              </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link to="/classroom" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                            <Link to="/classroom" className="waves-effect waves-green btn-flat modal-action modal-close">Add Student</Link>
                        </div>
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

                    <div id="addactivity" className="modal">
                        <div className="modal-content">
                            <h3>Add Activity</h3>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="activity" type="text" className="validate"/>
                                    <label htmlFor="activity">Activity</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="dueDate" type="text" className="validate"/>
                                    <label htmlFor="dueDate">Due Date</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="tags" type="text" className="validate"/>
                                    <label htmlFor="tags">Tags (separate by comma)</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link to="#" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                            <Link to="#" className="waves-effect waves-green btn-flat modal-action modal-close">Add Activity</Link>
                        </div>
                    </div>

                    <div id="deletestudent" className="modal">
                        <div className="modal-content">
                            <h3>Are you sure you want to delete this student?</h3>
                                <p>This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <Link to="#" className="waves-effect waves-green btn-flat modal-action modal-close">Yes</Link>
                            <Link to="#" className="waves-effect waves-red btn red modal-action modal-close">Cancel</Link>
                        </div>
                    </div>


                </div>

            <footer id="page-footer" className="content-mini content-mini-full font-s12 bg-gray-lighter clearfix">
                <div className="pull-right">
                    Crafted with
                    &nbsp;<i className="tiny material-icons">favorite</i>&nbsp;
                    by&nbsp;
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

// connect to redux store
export default ClassRoom;
