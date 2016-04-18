import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ClassListCarouselItem extends React.Component {
    render() {
        return (
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
        );
    }
}

ClassListCarouselItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default ClassListCarouselItem;