import {connect} from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import $ from 'jquery';
import { fetchClasses } from '../actions/classListActions';
import './../styles/style.css';

import '../../externalDependencies/js/materialize.js';

class NavBar extends React.Component {
    componentWillMount(){
        this.props.fetchClasses();
    }

    componentDidMount() {

        $('.button-collapse').click(function() {
            $('.side-nav').css({position: 'static', marginLeft: '-50px'});
            $('.button-collapse').css({visibility: 'hidden'});
        });
        $(".classDropDown").hide();
        $("#sideNav").hide();
        $("#classDD").click(function() {
            $(".classDropDown").slideToggle();
        });
    }

    logout(e){
        e.preventDefault();
        fetch('/api/account/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
            }
        })
        .then((res) => {
            if (res.status === 200 || res.status === 403) {
                window.location.href = '/';
            }
            else {
                window.location.href = '/class';
            }

        });

    }

    render() {
        let classList = [];

        this.props.classListAppState.classes.forEach((classItem) => {
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
                                <Link id="logo-container" to="/class" className="brand-logo">
                                    <img id="logo" src="/img/CMSC_Prince_wbox.png" alt="logo" style={{
                                        height: '50px'
                                    }}/>
                                    Pickr
                                </Link>
                                <ul className="right hide-on-med-and-down">
                                    <li>
                                        <a href="/" onClick={(e) => this.logout(e)}>Logout</a>
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
