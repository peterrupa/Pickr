import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import NavBar from '../components/NavBarLanding.jsx';

import $ from 'jquery';

const Materialize = window.Materialize;

class LogIn extends React.Component {
    componentDidMount(){
        if (localStorage.checkbox && localStorage.checkbox != '') {
            $('#remember-me').attr('checked', 'checked');
            $('#username').val(localStorage.username);
            $('#password').val(localStorage.password);
        } else {
            $('#remember-me').removeAttr('checked');
            $('#username').val('');
            $('#password').val('');
        }
    }

    post(e){
        e.preventDefault();

        let username = $('#username').val();
        let password = $('#password').val();
        let data = "username=" + username + "&password=" + password;
        let message = '';

        if (username !== '' && password !== '') {
            fetch('/api/account/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept':'application/json'
                },
                body: data
            })
            .then((res) => {
                switch (res.status) {
                    case 403: message = 'Username and Password combination'
                        + ' does not match!'; break;
                    case 404: message = 'Username is not registered to'
                     + ' any account!'; break;
                    case 500: message = 'Log-in failed. Please try again.';
                        break;
                    default: message = 'Error logging in!'; break;
                }

                if ($('#remember-me')[0].checked) {
                    localStorage.username = username;
                    localStorage.password = password;
                    localStorage.checkbox = $('#remember-me').val();
                } else {
                    localStorage.username = '';
                    localStorage.password = '';
                    localStorage.checkbox = '';
                }

                if (res.status === 200) {
                    window.location.href = '/class';
                }
                else {
                    Materialize.toast(message, 4000);
                }
            });
        }
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
                            <form onSubmit={(e) => this.post(e)} className="login-form">
                                <div className="row">
                                    <div className="input-field col s12 center">
                                    <img src="/img/CMSC_Prince_cropped.png" alt="" className="responsive-img valign profile-image-login" style={{height:'60px',width:'60px'}}/>
                                    <p className="center login-form-text">Pickr Log-In Form</p>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="username" type="text"/>
                                        <label htmlFor="username" className="center-align">Username</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password" type="password"/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field login-text">
                                        <input type="checkbox" id="remember-me" value="checked"/>
                                        <label htmlFor="remember-me">Remember me</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="submit" value="login" className="btn waves-effect waves-light col s12 z-depth-0"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6 m6 l6">
                                        <p className="margin medium-small">
                                        <Link to="signup">Register Now!</Link>
                                        </p>
                                    </div>
                                    <div className="input-field col s6 m6 l6">
                                        <p className="margin right-align medium-small">
                                        <Link to="forgotpassword"> Forgot password?</Link>
                                        </p>
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
export default LogIn;
