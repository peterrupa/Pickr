// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import io from 'socket.io-client';

import { fetchRandomizedVolunteers, fetchListOfStudents, success } from '../actions/presentationActions';

import './../styles/presentation.css';

// Be sure to rename your class name
class Presentation extends React.Component {

    componentWillMount() {
        const { fetchRandomizedVolunteers, fetchListOfStudents } = this.props;

        // TODO: fetch the list of students based on the current session
        fetchListOfStudents('cmsc128');

        this.students = [];
        this.carouselConfig = {
            currentIndex: 0
        };

        this.socket = io();
        this.socket.on('recieve volunteers', function(volunteers) {
            fetchRandomizedVolunteers(volunteers);
        });

    }

    componentDidUpdate() {
        const { presentationState, success } = this.props;

        if(presentationState.recievedVolunteer) {
            let targetIndex = this.getTargetIndex(presentationState.volunteers);
            if(targetIndex) {
                this.carouselConfig.targetIndex = targetIndex;
                this.animateCarousel();
                success();
            }
        }
    }

    getTargetIndex(target) {
        const listOfStudents = this.props.presentationState.students;
        for(let i = 0; i < listOfStudents.length; i++) {
            if(target.studentId == listOfStudents[i].studentId) {
                return i;
            }
        }

        return null;
    }

    animateCarousel() {
        const listOfStudents = this.props.presentationState.students;
        $('.carousel').carousel('next', listOfStudents.length * 1000 - this.carouselConfig.currentIndex + this.carouselConfig.targetIndex);
        this.carouselConfig.currentIndex = this.carouselConfig.targetIndex;
    }

    render() {
        let listOfStudents = this.props.presentationState.students;

        let students = [];
        for(let i = 0; i < listOfStudents.length; i++) {
            students.push(
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

        if(listOfStudents.length > 0) {
            return (                
                <div style={{backgroundColor:'black',maxWidth: '100%', height:'750px', width:'100%',backgroundSize:'cover'}}>
                    <div id="deck" className="carousel">
                        {students}
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
    fetchListOfStudents: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ presentationState: state.presentationState }),
    { fetchRandomizedVolunteers, fetchListOfStudents, success }
)(Presentation);