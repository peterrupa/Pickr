import {connect} from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import $ from 'jquery';
import { fetchClasses } from '../actions/classListActions';
import './../styles/style.css';

class NavBar extends React.Component {
    componentWillMount(){
        this.props.fetchClasses({
            accountId: window.location.pathname.substring(7)
        });
    }

    componentDidMount() {
        $(".classDropDown").hide();
        $("#classDD").click(function() {
            $(".classDropDown").slideToggle();
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
            <div>
                <nav id="navbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div id="navbar_div" className="nav-wrapper container">
                        <Link to="/class" className="brand-logo">
                            <img id="logo" src="./img/CMSC_Prince_wbox.png" alt="logo" style={{
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
                        {classList}
                    </ul>
                </div>
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
