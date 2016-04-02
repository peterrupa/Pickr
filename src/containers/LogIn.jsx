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
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/#intro">About</a>
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
                    height: '900px',
                    width: '400px',
                    margin: '0 auto'
                }}>
                    <div id="login-page" className="row">
                        <div className="col s12 card-panel">
                          <form className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <img src="./img/CMSC_Prince_cropped.png" alt="" className="responsive-img valign profile-image-login" style={{height:'60px',width:'60px'}}/>
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
            <input type="submit" value="Register Now" className="btn waves-effect waves-light col s12"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6 m6 l6">
            <p className="margin medium-small"><a href="/signup">Register Now!</a></p>
          </div>
          <div className="input-field col s6 m6 l6">
              <p className="margin right-align medium-small"><a href="/forgotpassword">Forgot password?</a></p>
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
