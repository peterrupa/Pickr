// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import { fetchRandomizedVolunteers } from '../actions/presentationActions';

import './../styles/presentation.css';
import '../externalJS/random.js';

// Be sure to rename your class name
class Presentation extends React.Component {

    componentWillMount() {
        const { fetchRandomizedVolunteers } = this.props;
        this.socket = io();
        this.socket.on('recieve volunteers', function(volunteers) {
            fetchRandomizedVolunteers(volunteers);
        });
    }

    componentDidMount() {
        $('.carousel').carousel();
    }

    render() {
        const { presentationState } = this.props;
        let imgUrl = '../../img/presentation1.png';
        return (
            <div style={{backgroundColor:'black',maxWidth: '100%', height:'750px', width:'100%',backgroundSize:'cover'}}>
            <h1>{presentationState.volunteers.studentLName}, {presentationState.volunteers.studentFName}</h1>
                
                <a id="start" className="waves-effect waves-light btn" style={{marginTop: '100px',float:'right',marginRight: '5%'}}>Randomize</a>
                <div id="deck" className="carousel" >
                    <div className="carousel">
                        <a className="carousel-item">
                            <div className="studentPhoto">
                                <img className="" src="img/defaultPP.png" style={{width:'80%'}}/></div>

                                <div className="ribbon">
                                    <div className="ribbon-stitches-top"></div>
                                    <strong className="ribbon-content">
                                        <h1>Prince Karlo Aragones</h1>
                                    </strong>
                                    <div className="ribbon-stitches-bottom"></div>
                                </div>
                            </a>
                            <a className="carousel-item">
                                <div className="studentPhoto">
                                    <img className="" src="img/defaultPP.png" style={{width:'80%'}}/></div>
                                    <div className="ribbon">
                                        <div className="ribbon-stitches-top"></div>
                                        <strong className="ribbon-content">
                                            <h1>Angeli Tomagos</h1>
                                        </strong>
                                        <div className="ribbon-stitches-bottom"></div>
                                    </div>
                            </a>
                            <a className="carousel-item">
                                <div className="studentPhoto">
                                    <img className="" src="img/defaultPP.png" style={{width:'80%'}}/></div>
                                    <div className="ribbon">
                                        <div className="ribbon-stitches-top"></div>
                                        <strong className="ribbon-content">
                                            <h1>Narom Santos</h1>
                                        </strong>
                                        <div className="ribbon-stitches-bottom"></div>
                                    </div>
                            </a>
                            <a className="carousel-item">
                                <div className="studentPhoto">
                                    <img className="" src="img/defaultPP.png" style={{width:'80%'}}/></div>

                                    <div className="ribbon">
                                        <div className="ribbon-stitches-top"></div>
                                        <strong className="ribbon-content">
                                            <h1>Van Santos</h1>
                                        </strong>
                                        <div className="ribbon-stitches-bottom"></div>
                                    </div>
                            </a>
                            <a className="carousel-item">
                                <div className="studentPhoto">
                                    <img className="" src="img/defaultPP.png" style={{width:'80%'}}/></div>

                                   <div className="ribbon">
                                       <div className="ribbon-stitches-top"></div>
                                       <strong className="ribbon-content">
                                           <h1>Graceal Villamor</h1>
                                       </strong>
                                       <div className="ribbon-stitches-bottom"></div>
                                   </div>
                            </a>
                    </div>

                </div>

                <div className="countDown" style={{float:'right',bottom: '10px',marginRight: '5%'}}>
                    {/*<a id="sw_start" className="waves-effect waves-light btn-flat">START</a>
                                        <a id="sw_stop" className="waves-effect waves-light btn-flat">STOP</a>*/}
                    <div id="clockdiv">
                        <div>
                            <span id="sw_m">00</span>
                            {/*<div className="smalltext">Minutes</div>*/}
                        </div>
                        <div>
                            <span id="sw_s">00</span>
                            {/*<div className="smalltext">Seconds</div>*/}
                        </div>
                        <div>
                            <span id="sw_ms">00</span>
                            {/*<div className="smalltext">Milliseconds</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Presentation.propTypes = {
    presentationState: PropTypes.object.isRequired,
    fetchRandomizedVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ presentationState: state.presentationState }),
    { fetchRandomizedVolunteers }
)(Presentation);