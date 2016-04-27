import {connect} from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import $ from 'jquery';
import { fetchClasses } from '../actions/classListActions';
import './../styles/style.css';

import '../../externalDependencies/js/materialize.js';
// import '../../externalDependencies/js/custom-min.js';
// import '../../externalDependencies/js/plugin-min.js';
//import '../../externalDependencies/js/init.js';

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
        let classList = [];

        this.props.classListAppState.classes.forEach((classItem) =>{
            classList.push(
            <li key={classItem.id} className="collection-item">
                <Link to={"/classroom/" + classItem.id}>{classItem.classCode}</Link>
            </li>
            );
        });

        return (
                <div className="navbar-fixed" >
                    <nav id="nav_f" className="default_color">
                        <div className="container" style={{zDepth: '0'}}>
                            <div className="nav-wrapper">
                                <a href="#" id="logo-container" className="brand-logo">pickr</a >
                                <ul className="right hide-on-med-and-down">
                                    <li>
                                        <a href="/">Logout</a>
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

NavBar.propTypes = {
    classListAppState: PropTypes.object.isRequired,
    fetchClasses: PropTypes.func.isRequired
};


// connect to redux store
export default connect(state => ({
    classListAppState: state.classListAppState
}), {
    fetchClasses
})(NavBar);
