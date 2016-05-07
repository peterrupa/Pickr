import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import NavBar from '../components/NavBarLanding.jsx';

class ForgotPassword extends React.Component {
    componentDidMount(){
    }

    render() {

        return (
            <div>
                <NavBar/>
                <div style={{
                    width: '400px',
                    margin: '0 auto'
                }}>
                    <div id="login-page" className="row">
                        <div className="col s12 card-panel">
                            <form className="login-form">
                                <div className="row">
                                    <div className="input-field col s12 center">
                                        <img src="img/CMSC_Prince_cropped.png " alt=" " className="responsive-img valign profile-image-login" style={{
                                            height: '60px',
                                            width: '60px'
                                        }}/>
                                        <p className="center login-form-text">
                                            Pickr Forgot Password Form
                                        </p>
                                    </div >
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-communication-email prefix"></i>
                                        <input id="email" type="email" className="validate"/>
                                        <label htmlFor="email" className="center-align">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <Link to="/login" className="btn waves-effect waves-light col s12">Recover my Password</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6 m6 l6">
                                        <p className="margin medium-small"><Link to="/signup">Register Now!</Link></p>
                                    </div>
                                    <div className="input-field col s6 m6 l6">
                                        <p className="margin right-align medium-small"><Link to="/login">Log In!</Link></p>
                                    </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// connect to redux store
export default ForgotPassword;
