// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { getVolunteer, fetchAvailableVolunteers } from '../actions/controlpanelActions';

// Be sure to rename your class name
class ControlPanel extends React.Component {
    getVolunteer2() {
            {JSON.stringify(this.props.availableStudentsState.availableVolunteers)}
            var selectedVolunteer = this.props.availableStudentsState.availableVolunteers[Math.floor(Math.random() * this.props.availableStudentsState.availableVolunteers.length)];
      return <div>
        { this.props.selectedVolunteer.map(function (volunteer) {
            return <div>{JSON.stringify(volunteer.selectedVolunteer)}</div>
            })
        }
      </div>
    }

    componentWillMount() {
        this.props.fetchAvailableVolunteers('cmsc128');
    }

    render() {
        const { availableStudentsState, getVolunteer } = this.props;

        return (
            <div id="main">
            <h1>Control Panel</h1>
            <button onClick={this.getVolunteer2}>Select "Volunteer"</button>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    availableStudentsState: PropTypes.object.isRequired,
    getVolunteer: PropTypes.func.isRequired,
    fetchAvailableVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ availableStudentsState: state.availableStudentsState }),
    { getVolunteer, fetchAvailableVolunteers }
)(ControlPanel);