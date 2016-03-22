import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

// Be sure to rename your class name
class LogIn extends React.Component {
  componentDidMount(){

    let body = document.getElementByTagName('body');
    body.background = "./img/full-classroom.jpg";
  }

    render() {

        return (
            <div style={{backgroundImage:'url('+'./img/full-classroom.jpg'+')'}}>
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="nav-wrapper container">
                        <a id="logo-container" href="#" className="brand-logo">
                            <img src="img/CMSC_Prince_wbox.png" alt="logo" style={{
                                height: '40px',
                                width: '40px'
                            }}/>Pickr</a>
                        <ul className="right hide-on-med-and-down">

                            <li>
                                <a href="classpanel.html">Home</a>
                            </li>
                            <li>
                                <a href="#about">About</a>
                            </li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav">
                            <li>
                                <a href="index.html#about">About</a>
                            </li>
                        </ul>
                        <a href="#" data-activates="nav-mobile" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div style={{
                    height: '400px',
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
                                            Pickr Sign - Up Form
                                        </p>
                                    </div >
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="username" type="text" className="validate"/>
                                        <label htmlFor="username" className="center-align">Username</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-communication-email prefix"></i>
                                        <input id="email" type="email" className="validate"/>
                                        <label htmlFor="email" className="center-align">Email</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password" type="password" className="validate"/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password-again" type="password"/>
                                        <label htmlFor="password-again">Re-type password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <a href="register.html" className="btn waves-effect waves-light col s12">Register Now</a>
                                    </div>
                                    <div className="input-field col s12">
                                        <p className="margin center medium-small sign-up">Already have an account?
                                            <a href="log-in.html">Login</a>
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
