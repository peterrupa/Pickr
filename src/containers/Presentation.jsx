// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import io from 'socket.io-client';

import { fetchRandomizedVolunteers, fetchListOfStudents, success } from '../actions/presentationActions';

import PresentationCarouselItem from '../components/PresentationCarouselItem.jsx';

// Be sure to rename your class name
class Presentation extends React.Component {

    componentWillMount() {
        const { fetchRandomizedVolunteers, fetchListOfStudents } = this.props;

        fetchListOfStudents();

        this.students = [];
        this.carouselConfig = {
            currentIndex: 0
        };

        this.socket = io();
        this.socket.on('recieve volunteers', function(volunteers) {
            fetchRandomizedVolunteers(volunteers);
        });

    }

    componentDidMount() {
        $('.carousel').carousel();
    }

    componentDidUpdate() {
        const { presentationState, success } = this.props;

        $('.carousel').carousel();

        let listOfStudents = presentationState.students,
            listOfVolunteers = presentationState.volunteers,
            carouselConfig = this.carouselConfig;

        if(presentationState.recievedVolunteer) {
            for(let i = 0; i < listOfVolunteers.length; i++) {
                setTimeout(function() {
                    let targetIndex = -1;
                    for(let j = 0; j < listOfStudents.length; j++) {
                        if(listOfVolunteers[i].id == listOfStudents[j].id) {
                            targetIndex = j;
                            break;
                        }
                    }

                    if(targetIndex != -1) {
                        carouselConfig.targetIndex = targetIndex;
                        $('.carousel').carousel('next', listOfStudents.length * 1000 - carouselConfig.currentIndex + carouselConfig.targetIndex);
                        carouselConfig.currentIndex = carouselConfig.targetIndex;
                        success();
                    }
                }, 3500 * i + (Math.random() % i));
                this.carouselConfig = carouselConfig;
            }
        }
    }

    getTargetIndex(target) {
        const listOfStudents = this.props.presentationState.students;
        for(let i = 0; i < listOfStudents.length; i++) {
            if(target.id == listOfStudents[i].id) {
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
        let cardBgUrl = '/img/one-fourth.jpg';
        let bgUrl = '/img/black-board.jpg';

        const containerStyle = {
            backgroundImage: 'url('+bgUrl+')',
            maxWidth: '100%',
            height: '100vh',
            width: '100%',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };

        // let bgUrl = '/img/classhover.gif';
        if(listOfStudents.length > 0) {
            return (
                <div style={containerStyle}>
                    <div style={{zIndex: '10', width: '100vw', height: '100vh', position: 'absolute'}}></div>
                    <div id="deck" className="carousel">
                        {listOfStudents.map(student => (
                            <PresentationCarouselItem
                                key={student.id}
                                studentItem={student}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div style={{backgroundImage: 'url('+bgUrl+')',maxWidth: '100%', height:'100vh', width:'100%',backgroundSize:'cover'}}>
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
