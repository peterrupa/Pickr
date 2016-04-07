import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ClassListCarouselItem from './ClassListCarouselItem.jsx';

class ClassListCarousel extends React.Component {
    componentDidUpdate() {
        if($('#classCarousel').length > 0) {
            $('#classCarousel').carousel();
        }
    }
    
    render() {
        return (
            <div id="classCarousel" className="carousel" style={{margin:'0'}}>
                {this.props.classes.map(classItem => (
                    <ClassListCarouselItem
                        key={classItem.classCode}
                        classItem={classItem}
                    />
                ))}
            </div>
        );
    }
}

ClassListCarousel.propTypes = {
    classes: PropTypes.array.isRequired
};

export default ClassListCarousel;