// Import dependencies
import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import $ from 'jquery';


class NavBarLanding extends React.Component {
    componentDidMount() {
        let path = window.location.pathname;

        switch (path) {
            case '/login':
                if($('#loginBtn1').is(':visible')) $('#loginBtn1').hide("slow");
                if($('#loginBtn1').is(':visible')) $('#loginBtn1').hide("slow");
                $('#signupBtn1').show("slow");
                if($('#loginBtn2').is(':visible')) $('#loginBtn2').hide("slow");
                if($('#loginBtn2').is(':visible')) $('#loginBtn2').hide("slow");
                $('#signupBtn2').show("slow");
                break;
            case '/signup':
                if($('#signupBtn1').is(':visible')) $('#signupBtn1').hide("slow");
                if($('#signupBtn1').is(':visible')) $('#signupBtn1').hide("slow");
                $('#loginBtn1').show("slow");
                if($('#signupBtn2').is(':visible')) $('#signupBtn2').hide("slow");
                if($('#signupBtn2').is(':visible')) $('#signupBtn2').hide("slow");
                $('#loginBtn2').show("slow");
                break;
            default:
                if($('#signupBtn1').is(':hidden')) $('#signupBtn1').show("slow");
                if($('#signupBtn2').is(':hidden')) $('#signupBtn2').show("slow");
                if($('#loginBtn1').is(':hidden')) $('#loginBtn1').show("slow");
                if($('#loginBtn2').is(':hidden')) $('#loginBtn2').show("slow");
                break;
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
                                    <Link to="login" id="loginBtn1" style={{letterSpacing: '0px'}}>
                                        <i className="mdi-action-assignment-ind left" ></i>Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link to="signup" id="signupBtn1" style={{letterSpacing: '0px'}}>
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
                                <Link to="login" id="loginBtn2" style={{letterSpacing: '0px'}}>
                                    <i className="mdi-action-assignment-ind left"
                                    style={{
                                        fontSize: '240%',
                                        marginLeft: '5px'
                                    }}></i>
                                </Link>
                                <Link to="signup" id="signupBtn2" style={{letterSpacing: '0px'}}>
                                    <i className="mdi-action-assignment left"
                                    style={{
                                        fontSize: '240%',
                                        marginRight: '-5px'
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
