// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import { Link } from 'react-router';

import '../styles/index_style.css';

const Materialize = window.Materialize;
const $ = window.$;

class LandingPage extends React.Component {
    componentDidMount() {
        $('.parallax').parallax();

        $('.button-collapse').click(function(){
            $('.side-nav').css({position: 'static', marginLeft:'-50px'});
            $('.button-collapse').css({visibility:'hidden'});
        });
        $(window).scroll( function(){

            $('.side-nav').css({position: 'fixed'});
            $('.button-collapse').css({visibility:'visible'});

           /* Check the location of each desired element */
            $('.hideme').each( function(i){

                let bottom_of_object = $(this).offset().top + $(this).outerHeight();
                let bottom_of_window = $(window).scrollTop() + $(window).height();

               /* If the object is completely visible in the window, fade it it */
                if( bottom_of_window > bottom_of_object ){

                    $(this).animate({'opacity':'1'},500);

                }

            });

        });
    }

    render() {
        let imgUrl = '/img/ph.png';
        let divStyle = {
            backgroundColor: '#3E3E4B',
            backgroundRepeat: 'no-repeat',
            height:'90%'
        };

        let best = ["best", "hottest", "coolest"];

        return (
    <div id="top" className="scrollSpy">
        {/*}<!-- Pre Loader -->*/}
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>

        {/*<!--Navigation-->*/}
        <div className="navbar-fixed" >
            <nav id="nav_f" className="default_color">
                <div className="container" style={{zDepth: '0'}}>
                    <div className="nav-wrapper">
                        <a href="#" id="logo-container" className="brand-logo">pickr</a >
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a href="#intro">About</a>
                            </li>
                            <li>
                                <Link to="login">Log in</Link>
                            </li>
                            <li>
                                <Link to="signup">Sign up</Link>
                            </li>
                            <li>
                                <a href="#contact">Contact</a>
                            </li>
                        </ul>
                        <ul id="nav-mobile" className="side-nav">
                            <li>
                                <a href="#intro">About</a>
                            </li>
                            <li>
                                <Link to="login">Log in</Link>
                            </li>
                            <li>
                                <Link to="signup">Sign up</Link>
                            </li>
                            <li>
                                <a href="#contact">Contact</a>
                            </li>
                        </ul>
                        <a data-activates="nav-mobile" className="button-collapse">
                            <i className="mdi-navigation-menu"></i>
                        </a>
                    </div>
                </div >
            </nav>
        </div>

        {/*<!--Hero-->*/}
        <div className="section no-pad-bot" id="index-banner" style={divStyle}>
            <div className="container">
                <img className="center animated zoomIn" src="/img/logo.gif" style={{display: 'block',marginLeft:'auto', marginRight:'auto'}}/>
                <h1 className="text_h center header cd-headline letters type animated zoomIn" style={{fontFamily: 'Indie Flower'}}>
                    <span>We pick the </span >
                         <b className="underline is-visible">{best[0]}</b>
                </h1>
            </div >
        </div>

        {/*<!--Intro and service-->*/}
        <div id="intro" className="section scrollspy">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h2 className="center header text_h2">
                            Here at
                            <span className="span_h2" style={{margin:'1%'}}>
                                pickr:
                            </span>
                            Load Off Choosing, Be Best In Teaching!
			</h2>
                    </div>

                    <div className="col s12 m4 l4 hideme">
                        <div className="center promo promo-example">
                            <i className="mdi-image-flash-on"></i>
                            <h5 className="promo-caption">Great in classroom environment</h5>
                            <p className="light center">With all the tools in your hands, we assure you that you can master this application in a matter of minutes. We provided a guide to help you out in learning.</p>
                        </div>
                    </div>
                    <div className="col s12 m4 l4 hideme">
                        <div className="center promo promo-example">
                            <i className="mdi-social-group"></i>
                            <h5 className="promo-caption">Student Oriented</h5>
                            <p className="light center">We want you to experience high-end web application to aid you in your everyday lectures. We showcase necesarry tools needed in Link classroom setup aligned with your goals.</p>

                        </div>
                    </div>
                    <div className="col s12 m4 l4 hideme">
                        <div className="center promo promo-example">
                            <i className="mdi-hardware-desktop-windows"></i>
                            <h5 className="promo-caption">Split screen UI</h5>
                            <p className="light center">In every action done in your activities, it will be automatically be updated in your records including the real time changes in the chances of a student to be called in your class.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

                {/*<!--Work-->*/}
                <div className="parallax-container hide-on-med-and-down" >
                  <div className="parallax"><img src="/img/room.jpg "/></div>
                  </div>

                <div className="container" id="login">
                    <div className="row">
                        <div className="col s12 l3">
                            <div>
                                <img src="/img/samp1.png " className=" product "/>
                            </div>
                        </div >
                        <div className="col s12 l6 offset-l3 hideme">
                            <p className="light">With its goal to provide a simple and user-friendly aid for busy teachers, Pickr is changing your perspective of a high-end randomizer. Provided with guided tools, the application is so easy to learn and master in just a few minutes. It it also equipped with advanced features such as computations of class and student statistics that will further guide the teacher in selecting volunteers.</p>
                        </div>
                    </div>
                    <div className="center">
                            <br/>
                            <h2 style={{margin:'0 auto'}}> "With Pickr, we can serve you bettr" </h2>
                            <br/>
                            <br/>
                    </div >
                    <div className="row">
                        <div className="col s12 l6 hideme">
                            <br/>
                            <p className="light">Lets work together by sending us an email (walangtulugan@cmscpamore.com) about your suggestions and inquiries!</p>
                        </div>
                        <div className="col s12 l3 offset-l2">
                            <div>
                                <img src="/img/samp1.png" className="product"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={divStyle} className="center">
                    <video width="80%" height="15%" controls>
                      <source src="/vid/pickr-vid.mp4" type="video/mp4"/>
                      Your browser do not have support for this video
                    </video>
                </div>
                {/*<!--About us-->*/}
                <div className="section scrollspy" id="team">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h2 className="center header text_h2"> Want to know more about
                                    <span className="span_h2" style={{margin:'1%'}}>
                                        pickr</span >?
                                </h2>
                                <div className="center">
                                    <a className="btn-large" href="signup">Sign up now</a>
                                    </div></div >
                                </div>
                                </div></div >

                                {/*  <!--Footer-->*/}
                                <footer id="contact" className="page-footer default_color scrollspy">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col l6 s12">
                                                <h5 className="white-text">Company Bio</h5>
                                                <p className="grey-text text-lighten-4">We are a team of college students working on this project like its our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                                            </div>

                                        </div>
                                    </div>
                                </footer>
                            </div>
        );
    }

}

LandingPage.propTypes = {
    children: PropTypes.node
};

export default LandingPage;
