import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

// Be sure to rename your className name
import { reset, change } from '../actions/userActions';
const Materialize = window.Materialize;

class ChangePassword extends React.Component {
    componentWillMount(){
        let token= 'token=' + window.location.pathname.substring(7);
        let message = '';
        fetch('/api/account/resetPassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
            },
            body: token
        })
        .then((res) => {
            switch (res.status) {
                case 404: message = 'Invalid Link!'; break;
                default: message = 'Invalid Link'; break;
            }
            Materialize.toast(message, 4000);
            if (res.status != 200) {
                Materialize.toast('Invalid Link', 4000, 'toast-error');
                window.location.href = '/forgotpassword';
            }
        })
        .catch((err) => {
            Materialize.toast('Error opening link!', 4000, 'toast-error');
        });
    }
    componentDidMount(){

    }
    change(e){
        e.preventDefault();

        let account= 'token=' + window.location.pathname.substring(7) + '&password=' + $('#password').val()+
            '&confirm_password=' + $('#password-again').val();
        let message = '';
        let password = $('#password').val();
        let confirmPassword = $('#password-again').val();

        fetch('/api/account/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
            },
            body: account
        })
        .then((res) => {
            switch (res.status) {
                case 200: message = 'Successfully changed password!'; break;
                case 400: message = 'Error changing password!'; break;
            }
            Materialize.toast(message, 4000);
            if (res.status === 200) {
                window.location.href = '/login';
            }
            else{
                Materialize.toast('Error changing password!', 4000, 'toast-error');
            }

        })
        .catch((err) => {
            Materialize.toast('Error changing password!', 4000, 'toast-error');
        });
    }
    render() {
        return (
            <div style={{backgroundImage:'url('+'/img/full-classroom.jpg'+')'}}>
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="nav-wrapper container">
                        <Link id="logo-container" to="#" className="brand-logo">
                            <img src="img/CMSC_Prince_wbox.png" alt="logo" style={{
                                height: '40px',
                                width: '40px'
                            }}/>Pickr</Link>
                        <ul className="right hide-on-med-and-down">

                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/#intro">About</Link>
                            </li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav">
                            <li>
                                <Link to="index.html#about">About</Link>
                            </li>
                        </ul>
                        <Link to="#" data-activates="nav-mobile" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </Link>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div style={{
                    height: '900px',
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
                                            Pickr Change Password Form
                                        </p>
                                    </div >
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password" type="password" className="validate"/>
                                        <label htmlFor="password" className="center-align">Password</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password-again" type="password" className="validate"/>
                                        <label htmlFor="password-again" className="center-align">Confirm Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <Link to="/login" className="btn waves-effect waves-light col s12" onClick={(e) => this.change(e)} >Change Password</Link>
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
ChangePassword.propTypes = {
    ChangePasswordAppState: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
state => ({ ChangePasswordAppState: state.ChangePasswordAppState }),
    { reset, change }
)(ChangePassword);
