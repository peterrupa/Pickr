import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setAID } from '../actions/classroomActions';

//import ClassListDefaultItem from './ClassListDefaultItem.jsx';

class ActivityControlPanelLink extends React.Component {
    componentWillMount() {
        this.props.setAID(this.props.activityID);
    }

    render() {
        return (
                <Link to="/controlPanel">
                    <i className="mdi-action-settings"></i>
                </Link>
        );
    }
}

ActivityControlPanelLink.propTypes = {
    activityID: PropTypes.object.isRequired,
    setAID: PropTypes.func.isRequired
};

export default connect(
    state => ({ classroomAppState: state.classroomAppState}),
        { setAID }
)(ActivityControlPanelLink);
