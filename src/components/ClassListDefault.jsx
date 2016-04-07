import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ClassListDefault extends React.Component {
    render() {
        return (
            <div id="classCards" className="container" style={{position: 'relative', top: '-400px'}}>
                <div className="row">
                    <ul>
                        <li>
                            <div className="col s12 m6 l4">
                                <div className="card-panel green darken-2 class-card">
                                    <h5>
                                        <Link to="/classroom">CMSC 128</Link>
                                    </h5>
                                    <h6>AB-3L</h6>
                                    <p>
                                        Introduction to Software Engineering
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="col s12 m6 l4">
                                <div className="card-panel green darken-2 class-card">
                                    <h5>
                                        <Link to="/classroom">CMSC 128</Link>
                                    </h5>
                                    <h6>AB-3L</h6>
                                    <p>
                                        Introduction to Software Engineering
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="col s12 m6 l4">
                                <div className="card-panel green darken-2 class-card">
                                    <h5>
                                        <Link to="/classroom">CMSC 128</Link>
                                    </h5>
                                    <h6>AB-3L</h6>
                                    <p>
                                        Introduction to Software Engineering
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="col s12 m6 l4">
                                <div className="card-panel green darken-2 class-card">
                                    <h5>
                                        <Link to="/classroom">CMSC 128</Link>
                                    </h5>
                                    <h6>AB-3L</h6>
                                    <p>
                                        Introduction to Software Engineering
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="col s12 m6 l4">
                                <div className="card-panel green darken-2 class-card">
                                    <h5>
                                        <Link to="/classroom">CMSC 128</Link>
                                    </h5>
                                    <h6>AB-3L</h6>
                                    <p>
                                        Introduction to Software Engineering
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ClassListDefault;