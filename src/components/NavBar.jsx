import {connect} from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import $ from 'jquery';
import './../styles/style.css';

import '../../externalDependencies/js/materialize.js';
// import '../../externalDependencies/js/custom-min.js';
// import '../../externalDependencies/js/plugin-min.js';
//import '../../externalDependencies/js/init.js';

class NavBar extends React.Component {
    componentDidMount() {
        $('.button-collapse').click(function(){
            //console.log("foo");
            $("#sideNav").toggle("slide");

        });
        $(".classDropDown").hide();
        $("#sideNav").hide();
        $("#classDD").click(function() {
            $(".classDropDown").slideToggle();

        });
    }
    render() {
        return (
            <div>
                <nav id="navbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div id="navbar_div" className="nav-wrapper container">
                        <Link to="/class" className="brand-logo">
                            <img id="logo" src="/img/CMSC_Prince_wbox.png" alt="logo" style={{
                                height: '50px'
                            }}/>
                            Pickr
                        </Link>
                        <ul className="right hide-on-med-and-down">
                            <li>
                              <Link to="/">Logout</Link>
                            </li>
                            <li>
                                <a id="classDD" href="#">Classes</a>
                            </li>

                        </ul>

                        <a href="#" data-activates="sideNav" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
                <div className="classDropDown z-depth-1" style={{float:'right'}}>
                    <br/>
                    <br/>
                    <br/>
                </div>

                <div id="sideNav" className="hide-on-large" style={{float:'left'}}>
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


// connect to redux store
export default NavBar;
