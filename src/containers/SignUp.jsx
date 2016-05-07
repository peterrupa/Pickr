// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import actions associated to this page
// import { create } from '../actions/userActions';

const Materialize = window.Materialize;

// Be sure to rename your class name
class SignUp extends React.Component {
    componentDidMount() {

        $('.button-collapse').click(function() {
            $('.side-nav').css({position: 'static', marginLeft: '-50px'});
            $('.button-collapse').css({visibility: 'hidden'});
        });
        $(window).scroll(function() {

            $('.side-nav').css({position: 'fixed'});
            $('.button-collapse').css({visibility: 'visible'});

        });
        
        $('.hidden').hide();
    }
    create(e) {
        e.preventDefault();

        let account =
            'fname=' + $('#fname').val() +
            '&mi=' + $('#mi').val() +
            '&lname=' + $('#lname').val() +
            '&username=' + $('#username').val() +
            '&email=' + $('#email').val() +
            '&password=' + $('#password').val();

        let password = $('#password').val();
        let confirmPassword = $('#password-again').val();
        let message = '';

        if (password === '') {
            $('.errorPasswordReq').show();
        }
        if (confirmPassword === '') {
            $('.errorPasswordAgainReq').show();
        }
        if ($('#fname').val() === '') {
            $('.errorFnameReq').show();
        }
        if ($('#lname').val() === '') {
            $('.errorLnameReq').show();
        }
        if ($('#mi').val() === '') {
            $('.errorMIReq').show();
        }
        if ($('#username').val() === '') {
            $('.errorUsernameReq').show();
        }
        if ($('#email').val() === '') {
            $('.errorEmailReq').show();
        }

        if (password !== confirmPassword) {
            $('.errorPassword').show();
        }
        else {
            $('.errorRequired').hide();
            $('.errorPassword').hide();

            fetch('/api/account/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept':'application/json'
                },
                body: account
            })
            .then((res) => {
                switch (res.status) {
                    case 400: message = 'Invalid data!'; break;
                    case 401: message = 'Username already taken!'; break;
                    case 403: message = 'Register failed! Please try again.'; break;
                    default: message = 'Error adding account!'; break;
                }
                
                if (res.status === 200) {
                    window.location.href = '/login';
                }
                else {
                    Materialize.toast(message, 4000);
                }
            })
            .catch((err) => {
                Materialize.toast('Error adding account!', 4000, 'toast-error');
            });
        }
    }
    render() {

        return (
            <div style={{backgroundImage:'url(/img/full-classroom.jpg)',margin:'0'}}>
                        <div className="navbar-fixed" >
                            <nav id="nav_f" className="default_color">
                                <div className="container" style={{zDepth: '0'}}>
                                    <div className="nav-wrapper">
                                         <img id="logo" className="hide-on-med-and-down" src="/img/CMSC_Prince_wbox.png" alt="logo" style={{
                                             height: '50px'
                                         }}/>
                                        <a href="#" id="logo-container" className="brand-logo">pickr</a >
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
                <div style={{
                    width: '800px',
                    margin: '0 auto'
                }}>
                    <div id="signup-page" className="row no-margin">
                        <div className="col s12 card-panel">
                            <form className="signup-form" onSubmit={(e) => this.create(e)}>
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

                                 <div className="row">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="lname" type="text"  pattern="[A-Za-z \.]{2,50}"/>
                                        <label htmlFor="lname" className="center-align">Last Name</label>
                                        <p className="red-text errorRequired errorLnameReq hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            This field is required.
                                        </p>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s9">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="fname" type="text"  pattern="[A-Za-z ]{2,50}"/>
                                        <label htmlFor="fname" className="center-align">First Name</label>
                                        <p className="red-text errorRequired errorFnameReq hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            This field is required.
                                        </p>
                                    </div>
                                    <div className="input-field col s3">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="mi" type="text" pattern="[A-Za-z \.]{1,50}"/>
                                        <label htmlFor="mi">Middle Initial</label>
                                        <p className="red-text errorRequired errorMIReq hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            This field is required.
                                        </p>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="username" type="text"  pattern="[A-Z-a-z][A-Za-z0-9]{7,32}"/>
                                        <label htmlFor="username" className="center-align">Username</label>
                                        <p className="red-text errorRequired errorUsernameReq hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            This field is required.
                                        </p>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-communication-email prefix"></i>
                                        <input id="email" type="email"/>
                                        <label htmlFor="email" className="center-align">Email</label>
                                        <p className="red-text errorRequired errorEmailReq hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            This field is required.
                                        </p>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password" type="password"/>
                                        <label htmlFor="password">Password</label>
                                        <p className="red-text errorPassword hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            Password and Re-type Password not equal.
                                        </p>
                                        <p className="red-text errorRequired errorPasswordReq hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            This field is required.
                                        </p>
                                    </div>
                                </div>

                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password-again" type="password"/>
                                        <label htmlFor="password-again">Re-type password</label>
                                    </div>
                                    <p className="red-text errorPassword hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            Password and Re-type Password not equal.
                                    </p>
                                    <p className="red-text errorRequired errorPasswordAgainReq hidden"
                                        style={{
                                            marginTop: '0px',
                                            marginLeft: '50px'
                                        }}>
                                        This field is required.
                                    </p>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="submit" value="register" className="btn waves-effect waves-light col s12 z-depth-0"/>
                                    </div>
                                    <div className="input-field col s12">
                                        <p className="margin center medium-small sign-up">Already have an account?
                                            <Link to="/login">
                                                Login</Link>
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

export default SignUp;