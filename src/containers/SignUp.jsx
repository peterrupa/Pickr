// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import actions associated to this page
import NavBar from '../components/NavBarLanding.jsx';

const Materialize = window.Materialize;

// Be sure to rename your class name
class SignUp extends React.Component {
    componentDidMount() {
        let usernameDOM = document.getElementById('username');

        $('.button-collapse').click(() => {
            $('.side-nav').css({position: 'static', marginLeft: '-50px'});
            $('.button-collapse').css({visibility: 'hidden'});
        });
        $(window).scroll(() => {

            $('.side-nav').css({position: 'fixed'});
            $('.button-collapse').css({visibility: 'visible'});

        });

        $('#username')
            .focusin(() => {
                $('.errorUsernamePattern').hide();
            })
            .focusout(() => {
                if(usernameDOM.validity.patternMismatch) {
                    $('.errorUsernamePattern').show();
                } else {
                    $('.errorUsernamePattern').hide();
                }
            });

        $('.hidden').hide();
    }
    create(e) {
        e.preventDefault();

        let account =
            'username=' + $('#username').val() +
            '&email=' + $('#email').val() +
            '&password=' + $('#password').val();

        let password = $('#password').val();
        let confirmPassword = $('#password-again').val();
        let message = '';
        let err = false;

        if (password === '') {
            $('.errorPasswordReq').show();
            err = true;
        }
        if (confirmPassword === '') {
            $('.errorPasswordAgainReq').show();
            err = true;
        }
        if ($('#username').val() === '') {
            $('.errorUsernameReq').show();
            err = true;
        }
        if ($('#email').val() === '') {
            $('.errorEmailReq').show();
            err = true;
        }
        if (password !== confirmPassword) {
            $('.errorPassword').show();
            err = true;
        }

        if(!err) {
            $('.errorRequired').hide();
            $('.errorPassword').hide();

            fetch('/api/account/createAccount', {
                method: 'POST',
                credentials: 'include',
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
            <div>
                <NavBar/>
                <div style={{
                    width: '400px',
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
                                        <p className="red-text errorRequired errorUsernamePattern hidden"
                                            style={{
                                                marginTop: '0px',
                                                marginLeft: '50px'
                                            }}>
                                            Username must contain 7-32 characters.
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
                                        <input id="submitInput" type="submit" value="register" className="btn waves-effect waves-light col s12 z-depth-0"/>
                                    </div>
                                    <div className="input-field col s12">
                                        <p className="margin center medium-small sign-up">Already have an account? <Link to="/login">Login</Link>
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
