// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Be sure to rename your class name
class SignUp extends React.Component {
    componentDidMount(){

       $('.button-collapse').click(function(){
            $('.side-nav').css({position: 'static', marginLeft:'-50px'});
            $('.button-collapse').css({visibility:'hidden'});
        });
        $(window).scroll( function(){

            $('.side-nav').css({position: 'fixed'});
            $('.button-collapse').css({visibility:'visible'});

       });

        let body = document.getElementByTagName('body');
        body.background = "/img/full-classroom.jpg";
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
                                            Pickr Sign - Up Form
                                        </p>
                                    </div >
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
                                        <input type="submit" value="Register Now" className="btn waves-effect waves-light col s12" formAction="login"/>
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
export default SignUp;
