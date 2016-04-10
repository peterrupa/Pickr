// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import NavBar from '../components/NavBar.jsx';
import './../styles/style.css';
import './../styles/styles.scss';
//import classListJS from '../../externalDependencies/js/classList.js';
import ClassListCarousel from '../components/ClassListCarousel.jsx';
import ClassListDefault from '../components/ClassListDefault.jsx';

import { fetchInitialClasses } from '../actions/classListActions';


// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;
const $ = window.$;

// Be sure to rename your class name
class ClassList extends React.Component {
    componentWillMount() {
        this.props.fetchInitialClasses();
    }

    componentDidMount() {
        $('.modal-trigger').leanModal();
    }

    render() {
        return (
            <div style={{paddingTop: '8%'}}>
                <Link className="waves-effect waves-light btn-floating btn-large modal-trigger" to="#addclass" style={{position: 'fixed', bottom:'20px',right:'20px' }}><i className="material-icons">add</i></Link>

                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            <div className="col s12">
                                <h4>Classes</h4>
                            </div>
                        </div>

                        <ClassListDefault
                            classes={this.props.classListAppState.classes}
                        />


                        {/*start of modal form*/}
                        <div id="addclass" className="modal">
                            <div className="modal-content">
                                <h3>Add Class</h3>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="className" type="text" className="validate"/>
                                        <label htmlFor="className">Class Name</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="classSection" type="text" className="validate"/>
                                        <label htmlFor="classSection">Class Section</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Link to="/class" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                                <Link to="/class" className="waves-effect waves-green btn-flat modal-action modal-close">Add Class</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ClassList.propTypes = {
    classListAppState: PropTypes.object.isRequired,
    fetchInitialClasses: PropTypes.func.isRequired
};

// connect to redux store
export default connect(state => ({
    classListAppState: state.classListAppState
}), {
    fetchInitialClasses
})(ClassList);
