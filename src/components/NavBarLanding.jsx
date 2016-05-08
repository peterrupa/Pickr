// Import dependencies
import React, {PropTypes} from 'react';
import { Link } from 'react-router';


class NavBarLanding extends React.Component {
    render() {
        return (
            <div className="navbar-fixed" >
                <nav id="nav_f" className="default_color">
                    <div className="container" style={{zDepth: '0'}}>
                        <div className="nav-wrapper">
                            <Link to="/" id="logo-container" className="brand-logo" style={{
                                letterSpacing: '1px'
                            }}>
                                <img id="logo" src="/img/CMSC_Prince_wbox.png" alt="logo" style={{
                                    height: '50px'
                                }}/>
                                pickr
                            </Link>
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link to="login" style={{
                                        letterSpacing: '0px'
                                    }}>
                                        <i className="mdi-action-assignment-ind left" ></i>Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link to="signup" style={{
                                        letterSpacing: '0px'
                                    }}>
                                        <i className="mdi-action-assignment left"></i>Sign up
                                    </Link>
                                </li>
                            </ul>
                            <ul id="nav-mobile" className="side-nav">
                                <li>
                                    <Link to="login" style={{
                                        letterSpacing: '0px'
                                    }}>
                                        <i className="mdi-action-assignment-ind left" ></i>Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link to="signup" style={{
                                        letterSpacing: '0px'
                                    }}>
                                        <i className="mdi-action-assignment left"></i>Sign up
                                    </Link>
                                </li>
                            </ul>
                            <a data-activates="nav-mobile" className="button-collapse">
                                <i className="mdi-navigation-menu"></i>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBarLanding;
