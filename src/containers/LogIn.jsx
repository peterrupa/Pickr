import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

// Be sure to rename your class name

class LogIn extends React.Component {
    componentDidMount() {

        $('.button-collapse').click(function() {
            $('.side-nav').css({position: 'static', marginLeft: '-50px'});
            $('.button-collapse').css({visibility: 'hidden'});
        });
        $(window).scroll(function() {

            $('.side-nav').css({position: 'fixed'});
            $('.button-collapse').css({visibility: 'visible'});

        });
    }

    render() {

        return (
            <div style={{
                backgroundImage: 'url(' + '/img/full-classroom.jpg' + ')'
            }}>
                <div className="navbar-fixed">
                    <nav id="nav_f" className="default_color">
                        <div className="container" style={{
                            zDepth: '0'
                        }}>
                            <div className="nav-wrapper">
                                <img id="logo" src="/img/CMSC_Prince_wbox.png" alt="logo" style={{
                                    height: '50px'
                                }}/>
                                <a href="#" id="logo-container" className="brand-logo">Pickr</a >
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
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/#intro">About</Link>
                                    </li>
                                </ul>
                                <a data-activates="nav-mobile" className="button-collapse">
                                    <i className="mdi-navigation-menu"></i>
                                </a>
                            </div>
                        </div >
                    </nav>
                </div>

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
                                        <img src="/img/CMSC_Prince_cropped.png" alt="" className="responsive-img valign profile-image-login" style={{
                                            height: '60px',
                                            width: '60px'
                                        }}/>
                                        <p className="center login-form-text">Pickr Log-In Form</p>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="username" type="text" required="true"/>
                                        <label htmlFor="username" className="center-align">Username</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password" type="password" required="true"/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field login-text">
                                        <input type="checkbox" id="remember-me"/>
                                        <label htmlFor="remember-me">Remember me</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="submit" value="Login" className="btn waves-effect waves-light col s12" formAction="class"/>
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
                                            <Link to="forgotpassword">
                                                Forgot password?</Link>
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
