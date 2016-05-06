import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setAID } from '../actions/classroomActions';
import ActivityDeleteModal from '../components/ActivityDeleteModal.jsx';

//import ClassListDefaultItem from './ClassListDefaultItem.jsx';

class ActivityItem extends React.Component {
    componentWillMount() {
        this.props.setAID(this.props.activity.id);
    }

    render() {
        return (
            <li key={this.props.activity.id} className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
              <label htmlFor="task1" style={{textDecoration: 'none'}}>
                <Link to="/presentation">
                  {this.props.activity.activityName}
                </Link>
              </label>
              <div className="right">
                <ActivityDeleteModal activity={this.props.activity}/>
                <Link to="/controlPanel">
                    <i className="mdi-action-settings"></i>
                </Link>
                <Link to="/presentation">
                    <i className="mdi-image-color-lens"></i>
                </Link>
              </div>
            </li>
        );
    }
}

ActivityItem.propTypes = {
    activity: PropTypes.object.isRequired,
    setAID: PropTypes.func.isRequired
};

export default connect(
    state => ({ classroomAppState: state.classroomAppState}),
        { setAID }
)(ActivityItem);
