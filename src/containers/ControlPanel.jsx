// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getVolunteer, fetchAvailableVolunteers } from '../actions/controlpanelActions';

// Be sure to rename your class name
class ControlPanel extends React.Component {
    componentWillMount() {
        this.props.fetchAvailableVolunteers('cmsc128');
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
                    <li className="collection-header">
                        <div className="container">
                            <h5>CMSC 128</h5>
                        </div>
                    </li>
                    <li className="collection-item avatar">
                            <div className="collapsible-header">
                                <i className="material-icons right">close</i>
                                <i className="material-icons circle">perm_contact_calendar</i>
                                <h6 className="bold">Dick Grayson</h6>
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
                                <i className="material-icons right">close</i>
                                <i className="material-icons circle">perm_contact_calendar</i>
                                <h6 className="bold">"Barbara Gordon"</h6>
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
                                <i className="material-icons right">close</i>
                                <i className="material-icons circle">perm_contact_calendar</i>
                                <h6 className="bold">Jason Todd</h6>
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
                                <i className="material-icons right">close</i>
                                <i className="material-icons circle">perm_contact_calendar</i>
                                <h6 className="bold">Tim Drake</h6>
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
                                <i className="material-icons right">close</i>
                                <i className="material-icons circle">perm_contact_calendar</i>
                                <h6 className="bold">Damian Wayne</h6>
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
    availableStudentsState: PropTypes.object.isRequired,
    getVolunteer: PropTypes.func.isRequired,
    fetchAvailableVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ availableStudentsState: state.availableStudentsState }),
    { getVolunteer, fetchAvailableVolunteers }
)(ControlPanel);
