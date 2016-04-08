// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import '../styles/oneUI.css';

// Be sure to rename your class name
class ClassRoom extends React.Component {
    componentDidMount(){
        $('.modal-trigger').leanModal();
    }
    render() {
        return (
            <div>
                <div className="tint" style={{  position: 'relative',
                    cursor: 'pointer',
                    boxShadow: 'rgba(0,0,0,.2) 3px 5px 5px'}}>
                    <div className="content bg-image overflow-hidden" style={{backgroundImage: 'url(' +'./img/bg.jpg'+')'}}>
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

                <div className="row">

                    <div className="col s12 m12 l4">
                        <div className="block block-bordered">
                            <div className="block-header">
                                <ul className="block-options">
                                    <li>
                                        <Link className="modal-trigger" to="#addstudent">
                                            <i className="material-icons">add</i>
                                        </Link>
                                    </li>
                                    <li>
                                        <i className="material-icons">edit</i>
                                    </li>
                                </ul>
                                <h3 className="block-title">Students</h3>
                            </div>
                            <div className="block-content">
                                <ul className="nav-users push">
                                    <li>
                                        <Link to="/student">
                                            <img className="img-avatar" src="./img/pic.jpg" alt=""/>
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
                                    <li>
                                        <Link to="student">
                                            <img className="img-avatar" src="./img/pic.jpg" alt=""/>
                                            Joshua Munoz
                                            <div className="font-w400 text-muted">
                                                <small>
                                                    <span className="task-cat purple" style={{color:'white'}}>&nbsp;tag1&nbsp;</span>
                                                </small>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="student">
                                            <img className="img-avatar" src="./img/pic.jpg" alt=""/>
                                            Amber Walker
                                            <div className="font-w400 text-muted">
                                                <small>
                                                    <span className="task-cat pink" style={{color:'white'}}>&nbsp;tag1&nbsp;</span>
                                                </small>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/*block cntent*/}
                        </div>
                    </div>
                    {/* product-card */}
                    <div className=" s6 m12 l4">
                        <ul id="task-card" className="collection with-header">
                            <span className="act" style={{color:'white',transition:'.5s'}}>
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
                                <input type="checkbox" id="task1"/>
                                <label htmlFor="task1" style={{textDecoration: 'none'}}>
                                    <Link to="/presentation">Create Mobile App UI.
                                    </Link>
                                    <Link to="#" className="secondary-content">
                                        <span className="ultra-small">Today</span>
                                    </Link>
                                </label>
                                <Link to="/controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="/presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <input type="checkbox" id="task2"/>
                                <label htmlFor="task2" style={{textDecoration: 'none'}}>Check the new API standerds.
                                    <Link to="#" className="secondary-content">
                                        <span className="ultra-small">Monday</span>
                                    </Link>
                                </label>
                                <Link to="/controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="/presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <input type="checkbox" id="task3" defaultChecked="checked"/>
                                <label htmlFor="task3" style={{textDecoration: 'line-through'}}>Check the new Mockup of ABC.
                                    <Link to="#" className="secondary-content">
                                        <span className="ultra-small">Wednesday</span>
                                    </Link>
                                </label>
                                <Link to="/controlPanel">
                                    <i className="mdi-action-settings right"></i>
                                </Link>
                                <Link to="/presentation">
                                    <i className="mdi-image-color-lens right"></i>
                                </Link>
                            </li>
                            <li className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
                                <input type="checkbox" id="task4" defaultChecked="checked" disabled="disabled"/>
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
                            <Link to="#" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                            <Link to="#" className="waves-effect waves-green btn-flat modal-action modal-close">Add Student</Link>
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
                    <footer id="page-footer" className="content-mini content-mini-full font-s12 bg-gray-lighter clearfix">
                        <div className="pull-right">
                            Crafted with
                            <i className="tiny material-icons">favorite</i>
                            by
                            <Link className="font-w600" to="#" target="_blank">CMSC128 AB-3L</Link>
                        </div>
                        <div className="pull-left">
                            <Link className="font-w600" to="#" target="_blank">Pickr 1.0</Link>
                            &copy;
                            <span className="js-year-copy"></span>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

// connect to redux store
export default ClassRoom;
