// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import actions associated to this page
import { create } from '../actions/userActions';

const Materialize = window.Materialize;
// Be sure to rename your class name
class SignUp extends React.Component {
    componentDidMount(){
    }
    create(e) {
        e.preventDefault();

        let account = {
            fname: $('#fname').val(),
            mi: $('#mi').val(),
            lname: $('#lname').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        fetch('/api/accout/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
            },
            body: account
        }).success((res) => {
            Materialize.toast('Successfully added account.', 4000, 'toast-success');
        })
        .catch((err) => {
            Materialize.toast('Error adding account.', 4000, 'toast-error');
        });
    }
    render() {

        return (
            <div style={{backgroundImage:'url(./img/full-classroom.jpg)',margin:'0'}}>
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
                            <form className="login-form" >
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
                                        <input id="fname" type="text" className="validate"/>
                                        <label htmlFor="fname" className="center-align">First Name</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="mi" type="text" className="validate"/>
                                        <label htmlFor="mi" className="center-align">Middle Initial</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="lname" type="text" className="validate"/>
                                        <label htmlFor="lname">Last Name</label>
                                    </div>
                                </div>

                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-social-person-outline prefix"></i>
                                        <input id="username" type="text" className="validate" required="true"/>
                                        <label htmlFor="username" className="center-align">Username</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-communication-email prefix"></i>
                                        <input id="email" type="email" className="validate" required="true"/>
                                        <label htmlFor="email" className="center-align">Email</label>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password" type="password" className="validate" required="true"/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>

                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="mdi-action-lock-outline prefix"></i>
                                        <input id="password-again" type="password" required="true"/>
                                        <label htmlFor="password-again">Re-type password</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <a href="/login" className="btn waves-effect waves-light col s12" onClick={(e) => this.create(e)}>Register Now</a>
                                    </div>
                                    <div className="input-field col s12">
                                        <p className="margin center medium-small sign-up">Already have an account?
                                            <Link to="/login"> Login</Link>
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
//export default SignUp;

SignUp.propTypes = {
    SignUpAppState: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
state => ({ SignUpAppState: state.SignUpAppState }),
    { create }
)(SignUp);
