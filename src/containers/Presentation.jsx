// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import io from 'socket.io-client';

import { fetchRandomizedVolunteers, fetchListOfStudents } from '../actions/presentationActions';

import './../styles/presentation.css';
import '../externalJS/random.js';

// Be sure to rename your class name
class Presentation extends React.Component {

    componentWillMount() {
        const { fetchRandomizedVolunteers, fetchListOfStudents, presentationState } = this.props;
        fetchListOfStudents('cmsc128');
        this.students = [];
        this.socket = io();
        this.socket.on('recieve volunteers', function(volunteers) {
            fetchRandomizedVolunteers(volunteers);
            $('.carousel').carousel('next', [Math.floor(Math.random() * 100000000)]);
            $('.countDown').show();
        });
    }

    componentDidMount() {
        $('.carousel').carousel();
    }

    componentDidUpdate() {
        const { presentationState } = this.props;
        let listOfStudents = this.props.presentationState.students;

        this.students = [];
        for(let i = 0; i < listOfStudents.length; i++) {
            this.students.push(
                <a key={listOfStudents[i].studentId} className="carousel-item">
                <div className="studentPhoto">
                <img className="" src="img/defaultPP.png" style={{width:'80%'}}/></div>

                <div className="ribbon">
                <div className="ribbon-stitches-top"></div>
                <strong className="ribbon-content">
                    <h1>{listOfStudents[i].studentFName} {listOfStudents[i].studentLName} </h1>
                </strong>
                <div className="ribbon-stitches-bottom"></div>
                </div>
                </a>
            );
        }
        $('.carousel').carousel();
    }

    render() {
        //let imgUrl = '../../img/presentation1.png';
        if(this.students.length > 0) {
            return (                
                <div style={{backgroundColor:'black',maxWidth: '100%', height:'750px', width:'100%',backgroundSize:'cover'}}>
                    <div id="deck" className="carousel">
                        {this.students}
                    </div>
                </div>
            );
        }

        return (
            <div style={{backgroundColor:'black',maxWidth: '100%', height:'750px', width:'100%',backgroundSize:'cover'}}>
                <h1 className="center">Loading students...</h1>
            </div>
        );
    }
}

Presentation.propTypes = {
    presentationState: PropTypes.object.isRequired,
    fetchRandomizedVolunteers: PropTypes.func.isRequired,
    fetchListOfStudents: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ presentationState: state.presentationState }),
    { fetchRandomizedVolunteers, fetchListOfStudents }
)(Presentation);