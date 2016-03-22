// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';

import '../styles/index_style.css';
import '../../externalDependencies/js/plugin-min.js';

class LandingPage extends React.Component {
    componentDidMount() {
        $('.parallax').parallax();
        $('.scrollSpy').scrollSpy();
    }

    render() {
        let imgUrl = '../../img/ph.png';
        let divStyle = {
            backgroundImage: 'url(' + imgUrl + ')'
        };
        return (
    <div id="top" className="scrollSpy">
        {/*}<!-- Pre Loader -->*/}
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>

        {/*<!--Navigation-->*/}
        <div className="navbar-fixed">
            <nav id="nav_f" className="default_color" role="navigation">
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="#" id="logo-container" className="brand-logo">pickr</a >
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a href="#intro">About</a>
                            </li>
                            <li>
                                <a href="#login">Log in</a>
                            </li>
                            <li>
                                <a href="#team">Sign up</a>
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
                                <a href="#login">Log in</a>
                            </li>
                            <li>
                                <a href="#team">Sign up</a >
                            </li>
                            <li>
                                <a href="#contact">Contact</a>
                            </li>
                        </ul >
                        <a href="#" data-activates="nav-mobile" className="button-collapse">
                            <i className="mdi-navigation-menu"></i>
                        </a>
                    </div>
                </div >
            </nav>
        </div>

        {/*<!--Hero-->*/}
        <div className="section no-pad-bot" id="index-banner" style={divStyle}>
            <div className="container">
                <h1 className="text_h center header cd-headline letters type">
                    <span>We pick the</span >
                    <span className="cd-words-wrapper waiting">
                        <b className="is-visible">best</b>
                        <b>largest</b>
                        <b>hottest</b>
                    </span>
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
                            <span className="span_h2">
                                pickr
                            </span>
                            we chepar chepar your students.</h2>
                    </div>

                    <div className="col s12 m4 l4">
                        <div className="center promo promo-example">
                            <i className="mdi-image-flash-on"></i>
                            <h5 className="promo-caption">Speeds up Discussions</h5>
                            <p className="light center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
                        </div>
                    </div>
                    <div className="col s12 m4 l4">
                        <div className="center promo promo-example">
                            <i className="mdi-social-group"></i>
                            <h5 className="promo-caption">Student Oriented</h5>
                            <p className="light center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>
                    <div className="col s12 m4 l4">
                        <div className="center promo promo-example">
                            <i className="mdi-hardware-desktop-windows"></i>
                            <h5 className="promo-caption">Split screen UI</h5>
                            <p className="light center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                        </div>
                    </div>
                </div>
            </div>
            < /div>

                {/*<!--Work-->*/}
                <div className="parallax-container">
                    <div className="parallax"><img src="./img/room.jpg "/></div>
                </div>

                <div className="container" id="login">
                    <div className="row">
                        <div className="col s12 l3">
                            <div>
                                <img src="./img/samp1.png " className=" product "/>
                            </div>
                        </div >
                        <div className="col s12 l6 offset-l3">
                            <p className="light">Insert brief description here baby baby Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa..Insert brief description here baby baby Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa..Insert brief description here baby baby Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa..</p>
                        </div>
                    </div>
                    <div className="row"></div >
                    <div className="row">
                        <div className="col s12 l6">
                            <p className="light">Insert brief description here baby baby Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.. Insert brief description here baby baby Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa..</p>
                        </div>
                        <div className="col s12 l3 offset-l2">
                            <div>
                                <img src="../../img/samp1.png" className="product"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<!--About us-->*/}
                <div className="section scrollspy" id="team">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h2 className="center header text_h2">
                                    Want to know more about
                                    <span className="span_h2">
                                        pickr</span >?
                                </h2>
                                <div className="center">
                                    <button className="btn-large">Sign up now</button>
                                    </div></div >
                                </div>
                                </div></div >

                                {/*  <!--Footer-->*/}
                                <footer id="contact" className="page-footer default_color scrollspy">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col l6 s12">
                                                <h5 className="white-text">Company Bio</h5>
                                                <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                                            </div>
                                            <div className="col l3 s12">
                                                <h5 className="white-text">Settings</h5>
                                                <ul>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 1</a>
                                                    </li>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 2</a>
                                                    </li>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 3</a>
                                                    </li>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 4</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col l3 s12">
                                                <h5 className="white-text">Connect</h5>
                                                <ul>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 1</a>
                                                    </li>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 2</a>
                                                    </li>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 3</a>
                                                    </li>
                                                    <li>
                                                        <a className="white-text" href="#!">Link 4</a>
                                                    </li>
                                                </ul>
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
