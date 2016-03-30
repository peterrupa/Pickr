// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { getVolunteer, setVolunteers, fetchAvailableVolunteers } from '../actions/controlpanelActions';

// Be sure to rename your class name
class ControlPanel extends React.Component {

    componentWillMount() {
        this.props.fetchAvailableVolunteers('cmsc128');
    }

    render() {
        return (
            <div>
            <h1>Control Panel</h1>
            <button>Select "Volunteer"</button>
            </div>
        );
    }
}

ControlPanel.PropTypes = {
    availableStudentsState: PropTypes.object.isRequired,
    selectedStudentsState: PropTypes.object.isRequired,
    getVolunteer: PropTypes.func.isRequired,
    setVolunteers: PropTypes.func.isRequired,
    fetchAvailableVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ presentationState: state.presentationState,
    selectedStudentsState: state.selectedStudentsState }),
    { getVolunteer, setVolunteers, fetchAvailableVolunteers }
)(ControlPanel);
