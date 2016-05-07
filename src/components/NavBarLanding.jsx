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
                            <Link to="/" id="logo-container" className="brand-logo">pickr</Link>
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link to="login">Log in</Link>
                                </li>
                                <li>
                                    <Link to="signup">Sign up</Link>
                                </li>
                            </ul>
                            <ul id="nav-mobile" className="side-nav">
                                <li>
                                    <Link to="login">Log in</Link>
                                </li>
                                <li>
                                    <Link to="signup">Sign up</Link>
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