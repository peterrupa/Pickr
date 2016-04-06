

// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import NavBar from '../components/NavBar.jsx';

import './../styles/styles.scss';
import './../styles/style.css';
// Import actions associated to this page
import { fetchClass, addNewClass } from '../actions/classActions';
//import classListJS from '../../externalDependencies/js/classList.js';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;
const $ = window.$;


// Be sure to rename your class name
class ClassList extends React.Component {
    
    
    componentWillMount(){
        this.props.fetchClass();
    }
    
    componentDidMount() {
        $('.modal-trigger').leanModal();
        //$('.carousel').carousel();

        let carousel = document.getElementById('classCarousel');
        carousel.style.visibility = "hidden";

        let cards = document.getElementById('classCards');
        cards.style.visibility = "visible";
    }

    handleClick(){
        let carousel = document.getElementById('classCarousel');
        let cards = document.getElementById('classCards');
        if(carousel.style.visibility == 'visible'){
            carousel.style.visibility = 'hidden';
        }else{
            carousel.style.visibility = 'visible';
        }
        if(cards.style.visibility == 'visible'){
            cards.style.visibility = 'hidden';
        }else{
            cards.style.visibility = 'visible';
        }
    }
    
    render() {
        const { classAppState, fetchClass } = this.props;
        let classCarouselList = [];
        let classCardList = [];
        let classes = this.props.classAppState.classes;
        classes.forEach(function(classInstance){
            classCarouselList.push(
                <a className="carousel-item" href="/classroom">
                     <div className="classroomPallete">
                       <i className="material-icons right">delete</i>
                       <h5>{classInstance.classCode}</h5>
                       <h6>{classInstance.classSection}</h6>
                       <br/>
                       <h6>{classInstance.className}</h6>
                     </div>
                     <br/>
                  </a>
            );
            classCardList.push(
                <li>
                <a className="cards-item" href="/classroom">
                     <div className="classroomPallete">
                       <i className="material-icons right">delete</i>
                       <h5>{classInstance.classCode}</h5>
                       <h6>{classInstance.classSection}</h6>
                       <br/>
                       <h6>{classInstance.className}</h6>
                     </div>
                     <br/>
                </a>
                </li>
            );
        });
        
        return (
            <div>
                <NavBar />
                <div style={{
                    textAlign: 'center',
                    margin: 'auto',
                    paddingTop: '8%'
                }}>
                    <a className="waves-effect waves-light btn modal-trigger green" href="#addclass">Add Class</a>
                    <button className="btn waves-effect waves-light grey darken-3" type="submit" name="action" onClick={this.handleClick} >Toggle View</button>
                </div>
                <div className="container">
                  <div id="classCarousel" className="carousel" style={{position: 'relative', top: '-50px'}}>
                    <h4>Classes</h4>
                    <br/>
                    <div>
                      {classCarouselList}
                    </div>
                  </div>
                </div>
                
                
                <div className="container">
                  <div id="classCards" className="cards" style={{position: 'relative', top: '-50px'}}>
                    <h4>Classes</h4>
                    <br/>
                    <div>
                      <ul>
                      	{classCardList}
                      </ul>
                    </div>
                  </div>
                </div>
                
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
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="classCode" type="text" className="validate"/>
                                <label htmlFor="classCode">Class Code</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</a>
                        <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Add Class</a>
                    </div>
                </div>
            </div>
        );
    }
}

ClassList.propTypes = {
    classAppState: PropTypes.object.isRequired,
    fetchClass: PropTypes.func.isRequired
};
// connect to redux store
export default connect(
    state => ({ classAppState: state.classAppState }),
    { fetchClass }
)(ClassList);
