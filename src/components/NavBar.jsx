import React from 'react';
import {Link} from 'react-router';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="nav-wrapper container">
                    <a id="logo-container" href="#" className="brand-logo"><img src="./img/CMSC_Prince_wbox.png" alt="logo" style={{
                        height: '40px',
                        width: '40px'
                    }}/>Pickr</a>
                    <ul className="right hide-on-med-and-down">

                        <li>
                            <a href="classNamepanel.html">Home</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a id="classDD">Classes</a>
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

        );
    }
}

export default NavBar;
