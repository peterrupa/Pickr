import React from 'react';
import { Link } from 'react-router';

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
                        <Link id="logo-container" to="/class" className="brand-logo">
                            <img src="/img/CMSC_Prince_wbox.png" alt="logo" style={{
                                height: '40px',
                                width: '40px'
                            }}/>
                            Pickr
                        </Link>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a id="classDD" href="#">Classes</a>
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
                            <Link to="/classroom">CMSC 170</Link>
                        </li>
                        <li className="collection-item">
                            <Link to="/classroom">CMSC 132</Link>
                        </li>
                        <li className="collection-item">
                            <Link to="/classroom">CMSC 125</Link>
                        </li>
                        <li className="collection-item">
                            <Link to="/classroom">CMSC 141</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;
