import React from 'react';
import { Link } from 'react-router';

import $ from 'jquery';
import './../styles/style.css';

class NavBar extends React.Component {
    componentDidMount() {

       $('.button-collapse').click(function(){
            $('.side-nav').css({position: 'static', marginLeft:'-50px'});
            $('.button-collapse').css({visibility:'hidden'});
        });
       
        $(window).scroll( function(){

            $('.side-nav').css({position: 'fixed'});
            $('.button-collapse').css({visibility:'visible'});

       });

    }
    render() {
        return (
                <div className="navbar-fixed" >
                    <nav id="nav_f" className="default_color">
                        <div className="container" style={{zDepth: '0'}}>
                            <div className="nav-wrapper">
                                <a href="#" id="logo-container" className="brand-logo">pickr</a >
                                <ul className="right hide-on-med-and-down">
                                    <li>
                                        <a h="/">Logout</a>
                                    </li>
                                </ul>
                                <ul id="nav-mobile" className="side-nav">
                                    <li>
                                        <a href="/">Logout</a> 
                                    </li>
                                </ul>
                                <a data-activates="nav-mobile" className="button-collapse">
                                    <i className="mdi-navigation-menu"></i>
                                </a>
                            </div>
                        </div >
                    </nav>
                </div>
        );
    }
}

export default NavBar;
