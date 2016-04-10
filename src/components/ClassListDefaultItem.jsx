import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ClassListDefaultItem extends React.Component {
    render() {
        return (
            <Link to={'/classroom/' + this.props.classItem.classCode}>
                <div className="card-panel cyan darken-3 class-card" style={{
                    minHeight: '200px'
                }}>
                    <h5>
                        {this.props.classItem.className}
                    </h5>
                    <p style={{textAlign: 'center'}}>
                        {this.props.classItem.classDesc}
                    </p>
                </div>
            </Link>
        );
    }
}

ClassListDefaultItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default ClassListDefaultItem;