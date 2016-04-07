import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ClassListCarousel extends React.Component {
    render() {
        return (
            <div id="classCarousel" className="carousel" style={{position: 'relative', top: '-50px'}}>
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
        );
    }
}

export default ClassListCarousel;