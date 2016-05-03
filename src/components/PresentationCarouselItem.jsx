import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './../styles/presentation.css';

class PresentationCarouselItem extends React.Component {
    render() {
        const { studentItem } = this.props;

        let img;
        if(!studentItem.image) {
            img = 'img/defaultPP.png';
        } else {
            img = '/uploads/' + studentItem.image;
        }

        return (
            <Link className="carousel-item" to="#">
                <div className="studentPhoto">
                    <img src={img} style={{width:'80%'}}/>
                </div>
                <div className="ribbon">
                    <div className="ribbon-stitches-top"></div>
                    <strong className="ribbon-content">
                        <h1>{studentItem.fname} {studentItem.lname} </h1>
                    </strong>
                    <div className="ribbon-stitches-bottom"></div>
                </div>
            </Link>
        );
    }
}

PresentationCarouselItem.propTypes = {
    studentItem: PropTypes.object.isRequired
};

export default PresentationCarouselItem;