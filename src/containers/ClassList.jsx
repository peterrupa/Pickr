// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import NavBar from '../components/NavBar.jsx';
import './../styles/style.css';
import './../styles/styles.scss';
//import classListJS from '../../externalDependencies/js/classList.js';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;
const $ = window.$;

// Be sure to rename your class name
class ClassList extends React.Component {
    componentDidMount() {
        $('.modal-trigger').leanModal();
        $('.carousel').carousel();

        let carousel = document.getElementById('classCarousel');
        carousel.style.display = "none";

        let cards = document.getElementById('classCards');
        cards.style.display = "block";
    }

    handleClick(){
      //TODO: avoid manipulating DOM tree in jsx files (using actions and queries)
        let carousel = document.getElementById('classCarousel');
        let cards = document.getElementById('classCards');
        if(carousel.style.display == 'block'){
            carousel.style.display = 'none';
        }else{
            carousel.style.display = 'block';
        }
        if(cards.style.display == 'block'){
            cards.style.display = 'none';
        }else{
            cards.style.display = 'block';
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    textAlign: 'center',
                    margin: 'auto',
                    paddingTop: '8%'
                }}>
                    <button className="btn waves-effect waves-light grey darken-3" type="submit" name="action" onClick={this.handleClick} style={{marginTop: '50px', marginBottom: '30px'}}>Toggle View</button>
                </div>

                <Link className="waves-effect waves-light btn-floating btn-large modal-trigger" to="#addclass" style={{position: 'fixed', bottom:'20px',right:'20px' }}><i className="material-icons">add</i></Link>
                <div className="container">
                    <div className="container">
                        <h4>Classes</h4>
                    </div>
                {  /*start of carousel view*/}
                    <div id="classCarousel" className="carousel" style={{margin:'0'}}>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 170</h5>
                                <h6>U-6l</h6>
                                <br/>
                                <h6>Artificial Intelligence</h6>
                            </div>
                            <div className="notes">Due Friday Activity: Karakot dakot na activity about probability</div>
                        </Link>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 132</h5>
                                <h6>T-1L</h6>
                                <br/>
                                <h6>Kristine Elaine Bautista</h6>
                            </div>
                            <div className="notes">Due Tomorrow Activity: Sequential circuit</div>
                        </Link>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 125</h5>
                                <h6>ST-1l</h6>
                                <br/>
                                <h6>John Emmanuel Encinas</h6>
                            </div>
                            <div className="notes"></div>
                        </Link>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 141</h5>
                                <h6>2L</h6>
                                <br/>
                                <h6>Donna Drio</h6>
                            </div>
                            <div className="notes"></div>
                        </Link>
                    </div>
                    {/*end of carousel view*/}

                    {/*start of card view*/}
                    <div id="classCards" className="container" style={{/*{position: 'relative', top: '-400px',*/ color: 'black'}}>
                    <Link className="waves-effect waves-light btn-floating btn-large modal-trigger" to="#addclass" style={{position: 'fixed', bottom:'20px',right:'20px' }}><i className="material-icons">add</i></Link>
                        <div className="row">
                            <ul>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <Link to="/classroom">
                                            <div id="classes" className="card-panel cyan darken-3 class-card">
                                                <h5>
                                                    CMSC 128
                                                </h5>
                                                <h6>AB-3L</h6>
                                                <p style={{textAlign: 'center'}}>
                                                    Introduction to Software Engineering
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <Link to="/classroom">
                                            <div id="classes" className="card-panel cyan darken-3 class-card">
                                                <h5>
                                                    CMSC 125
                                                </h5>
                                                <h6>ST-1L</h6>
                                                <p style={{textAlign: 'center'}}>
                                                    Introduction to Operating Systems
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <Link to="/classroom">
                                            <div id="classes" className="card-panel cyan darken-3 class-card">
                                                <h5>
                                                    CMSC 170
                                                </h5>
                                                <h6>U-6L</h6>
                                                <p style={{textAlign: 'center'}}>
                                                    Introduction to Artificial Intelligence
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <Link to="/classroom">
                                            <div id="classes" className="card-panel cyan darken-3 class-card">
                                                <h5>
                                                    CMSC 132
                                                </h5>
                                                <h6>T-2L</h6>
                                                <p style={{textAlign: 'center'}}>
                                                    Computer Architecture
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <Link to="/classroom">
                                            <div id="classes" className="card-panel cyan darken-3 class-card">
                                                <h5>
                                                    CMSC 127
                                                </h5>
                                                <h6>AB-3L</h6>
                                                <p style={{textAlign: 'center'}}>
                                                    File Processing and Database System
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <Link to="/classroom">
                                            <div id="classes" className="card-panel cyan darken-3 class-card">
                                                <h5>
                                                    CMSC 100
                                                </h5>
                                                <h6>UV-3L</h6>
                                                <p style={{textAlign: 'center'}}>
                                                    Web Programming
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/*end of class view*/}


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
        );
    }
}

// connect to redux store
export default ClassList;
