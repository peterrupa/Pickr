// This is an example page. Use this as your guideline when you make your own page.

// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar.jsx';

// Be sure to rename your className name
class StudentPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar />

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
                                    <div id="profile-page-header" className="card">

                                        <figure className="card-profile-image">
                                            <img src="./img/defaultPP.png" alt="profile image" className="circle z-depth-2 responsive-img activator" style={{
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
                                                    Student</span>
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
            </div>
        );
    }
}

// connect to redux store
export default StudentPage;
