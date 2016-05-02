// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addNote } from '../actions/controlPanelActions';
// Be sure to rename your class name
class ControlPanel extends React.Component {
    componentDidMount(){
        $('.modal-trigger').leanModal();
    }
    
    addNote(e) {
        e.preventDefault();
      
    }
    render() {
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
                                    <input id="nStudents" type="text" className="validate"/>
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
                                        <div className="tagLabel">AB<i className="material-icons right">close</i>
                                        </div>
                                        <div className="tagLabel">AB-3L<i className="material-icons right">close</i>
                                        </div>
                                        <div className="tagLabel">boy<i className="material-icons right">close</i>
                                        </div>
                                        <div className="tagLabel">girl<i className="material-icons right">close</i>
                                        </div>
                                    </blockquote>
                                    {/* <label className="bold' for="textarea1">Tags</label> */}
                                </div>
                                <button className="btn waves-effect waves-light grey darken-3" type="submit" name="action" onClick="">Randomize</button>
                            </div>
                        </div>
                        <br/><hr/><br/>
                        <div className="row">
                            <div className="container">
                                <ul className="collection with-header">
                                    <li className="collection-header">
                                        <h5>Students to Call</h5>
                                    </li>
                                    <li className="collection-item">
                                        <div>
                                            <i className="material-icons circle">perm_contact_calendar</i>Jason Todd<Link to="#!" className="secondary-content">
                                                <i className="material-icons">check</i>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div>
                                            <i className="material-icons circle">perm_contact_calendar</i>Barbara Gordon<Link to="#!" className="secondary-content">
                                                <i className="material-icons">check</i>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <br/><hr/><br/>
                        <div className="row">
                            <div className="container">
                                <h3 className="task-card-title">Notes</h3>
                                <Link className="btn-floating btn-tiny modal-trigger green right z-depth-0" to="#addNotes">
                                    <i className="large material-icons">add</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="addNotes" className="modal">
                    <form onSubmit={(e) => this.addNote()}>
                        <div className="modal-content">
                            <h3>Add Activity</h3>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="activityName" type="text" className="validate"/>
                                    <label htmlFor="activityName">Note</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link to={window.location.pathname} className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                            <button className="waves-effect waves-green btn-flat modal-action modal-close" type="submit">Add Note</button>
                        </div>
                    </form>
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

// connect to redux store
export default ControlPanel;
