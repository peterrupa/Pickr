// Import dependencies
import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import $ from 'jquery';


class NavBarLanding extends React.Component {

    componentDidMount() {
        let path = window.location.pathname;
        switch (path) {
            case '/login': $('#signupBtn').show();
                $('#loginBtn').hide(); break;
            case '/signup': $('#loginBtn').show();
                $('#signupBtn').hide(); break;
            default: break;
        }
    }

    render() {
        return (
            <div className="navbar-fixed" >
                <nav id="nav_f" className="default_color">
                    <div className="container" style={{zDepth: '0'}}>
                        <div className="nav-wrapper">
                            <Link to="/" id="logo-container" className="brand-logo" style={{
                                letterSpacing: '1px'
                            }}>
                                <img id="logo" src="/img/CMSC_Prince_wbox.png" alt="logo"
                                    style={{height: '50px'}}
                                    className="hide-on-med-and-down"/>
                                Pickr
                            </Link>
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link to="login" style={{letterSpacing: '0px'}}>
                                        <i className="mdi-action-assignment-ind left" ></i>Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link to="signup" style={{letterSpacing: '0px'}}>
                                        <i className="mdi-action-assignment left"></i>Sign up
                                    </Link>
                                </li>
                            </ul>
                            <span className="left hide-on-large-only">
                                <Link to="/" style={{letterSpacing: '0px'}}>
                                    <img src="/img/CMSC_Prince_wbox.png" alt="logo"
                                        style={{
                                            height: '40px',
                                            marginTop: '8px'
                                        }}/>
                                </Link>
                            </span>
                            <span className="right hide-on-large-only">
                                <Link to="login" id="loginBtn" style={{letterSpacing: '0px'}}>
                                    <i className="mdi-action-assignment-ind left"
                                    style={{
                                        fontSize: '240%',
                                        marginRight: '0px'
                                    }}></i>
                                </Link>
                                <Link to="signup" id="signupBtn" style={{letterSpacing: '0px'}}>
                                    <i className="mdi-action-assignment left"
                                    style={{
                                        fontSize: '240%',
                                        marginRight: '0px'
                                    }}></i>
                                </Link>
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBarLanding;
