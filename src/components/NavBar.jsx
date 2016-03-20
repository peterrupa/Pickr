import React from 'react';
import {Link} from 'react-router';

import $ from 'jquery';

class NavBar extends React.Component {
    componentDidMount() {
        $(".classDropDown").hide();
        $("#classDD").click(function() {
            $(".classDropDown").slideToggle();
        });
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="nav-wrapper container">
                        <a id="logo-container" href="#" className="brand-logo">
                            <img src="./img/CMSC_Prince_wbox.png" alt="logo" style={{
                                height: '40px',
                                width: '40px'
                            }}/>
                            Pickr
                        </a>
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
                <div className="classDropDown z-depth-1" style={{float:'right'}}>
                    <br/>
                    <br/>
                    <br/>

                    <ul className="collection">
                        <li className="collection-item">
                            <a href="setup.html">CMSC 170</a>
                        </li>
                        <li className="collection-item">CMSC 132</li>
                        <li className="collection-item">CMSC 125</li>
                        <li className="collection-item">CMSC 141</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;
